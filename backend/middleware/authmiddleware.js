import jwt from "jsonwebtoken";
const SECRET_KEY = "f1_secret_key";

export function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token no proporcionado" });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Token inválido" });
  }
}

export function isAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Acceso restringido" });
  }
  next();
}
