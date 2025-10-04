const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3030;
const DATA_DIR = path.join(__dirname, 'data');
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

const app = express();
app.use(cors());
app.use(express.json());

// endpoints
app.get('/api/items', (req, res) => res.json(items));
app.get('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === Number(req.params.id));
  if (!item) return res.status(404).json({ error: 'Item no encontrado' });
  res.json(item);
});

// Simular creación de orden
app.post('/api/orders', (req, res) => {
  const { cart } = req.body;
  if (!Array.isArray(cart)) return res.status(400).json({ error: 'cart inválido' });
  const total = cart.reduce((s, i) => s + (i.price || 0) * (i.qty || 1), 0);
  const order = { id: Date.now(), cart, total, createdAt: new Date() };
  // aquí podrías persistir la orden en disco/DB
  res.status(201).json(order);
});

app.listen(PORT, () => console.log(`API escuchando en http://localhost:${PORT}`));
