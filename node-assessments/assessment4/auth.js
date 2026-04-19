const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());

const users = [];
const refreshTokens = [];
const SECRET = "supersecret";
let nextId = 1;

const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "No token provided" });

  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

app.post("/auth/register", async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .json({ error: "Username and password are required" });

  if (users.find((u) => u.username === username))
    return res.status(400).json({ error: "Username already taken" });

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({
    id: nextId++,
    username,
    password: hashedPassword,
    role: role || "User",
  });

  res.status(201).json({ message: "User registered!" });
});

app.post("/auth/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ error: "Invalid credentials" });

  const accessToken = jwt.sign(
    { id: nextId, username: user.username, role: user.role },
    SECRET,
    {
      expiresIn: "1h",
    },
  );

  const refreshToken = jwt.sign({ id: user.id }, SECRET, { expiresIn: "7d" });
  refreshTokens.push(refreshToken);

  res.json({ accessToken, refreshToken });
});

app.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: `Welcome ${req.user.username}`, user: req.user });
});

app.post("/auth/refresh", (req, res) => {
  const { token } = req.body;
  if (!token || !refreshTokens.includes(token)) return res.sendStatus(403);

  const decoded = jwt.verify(token, SECRET);
  const newAccessToken = jwt.sign({ id: decoded.id }, SECRET, {
    expiresIn: "15m",
  });
  res.json({ accessToken: newAccessToken });
});

app.get("/admin", authMiddleware, (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ error: "Admins only!" });

  res.json({ message: "Welcome to the admin panel", users });
});

app.listen(3000, () => console.log("Running on http://localhost:3000"));
