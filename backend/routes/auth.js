import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// Simulación temporal de BD
let users = [
  { id: 1, name: "Admin", email: "admin@f1.com", password: bcrypt.hashSync("1234", 8), role: "admin" },
];

const SECRET_KEY = "f1_secret_key";

// 🔹 Registro de usuario
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ message: "El usuario ya existe" });
  }

  const hashed = bcrypt.hashSync(password, 8);
  const newUser = { id: Date.now(), name, email, password: hashed, role: "user" };
  users.push(newUser);

  res.json({ message: "Usuario registrado correctamente" });
});

// 🔹 Login de usuario
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

  const valid = bcrypt.compareSync(password, user.password);
  if (!valid) return res.status(401).json({ message: "Contraseña incorrecta" });

  const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: "2h" });

  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

export default router;
