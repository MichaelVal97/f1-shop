import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import authRoutes from "./routes/auth.js";
import { verifyToken, isAdmin } from "./Middleware/authMiddleware.js";

const app = express();
const PORT = process.env.PORT || 3030;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas de autenticación
app.use("/api/auth", authRoutes);

// 📂 Manejo de items (JSON local)
const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'items.json');

const sampleItems = [
  { id: 1, name: 'Casco F1 - 2025', price: 75.00, sku: 'CAS-001' },
  { id: 2, name: 'Gorra Equipo', price: 25.00, sku: 'GOR-002' },
  { id: 3, name: 'Camiseta Piloto', price: 30.00, sku: 'CAM-003' },
  { id: 4, name: 'Poster Circuito', price: 15.00, sku: 'POS-004' },
  { id: 5, name: 'Miniatura Coche', price: 45.00, sku: 'MIN-005' }
];

function ensureData() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify(sampleItems, null, 2));
  const raw = fs.readFileSync(DATA_FILE);
  return JSON.parse(raw);
}

let items = ensureData();

// Endpoints de items
app.get('/api/items', (req, res) => res.json(items));
app.get('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: 'Item no encontrado' });
  res.json(item);
});

// 💳 Manejo de órdenes en memoria
let orders = [];

// Ruta protegida: crear pedido (usuario logueado)
app.post("/api/orders", verifyToken, (req, res) => {
  const { cart } = req.body;
  if (!Array.isArray(cart)) return res.status(400).json({ error: 'cart inválido' });

  const total = cart.reduce((s, i) => s + (i.price || 0) * (i.qty || 1), 0);
  const newOrder = {
    id: Date.now(),
    userId: req.user.id,
    cart,
    total,
    createdAt: new Date()
  };

  orders.push(newOrder);
  res.status(201).json({ message: "Pedido registrado", order: newOrder });
});

// Ruta solo admin: ver todas las órdenes
app.get("/api/orders", verifyToken, isAdmin, (req, res) => {
  res.json(orders);
});

app.listen(PORT, () => console.log(`✅ Backend corriendo en http://localhost:${PORT}`));
