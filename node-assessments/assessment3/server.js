const express = require("express");
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

const tasks = [
  {
    id: 1,
    title: "Initial Task",
    description: "Hello World",
    completed: false,
  },
];
let nextId = 1;

app.post("/tasks", (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const task = {
    id: nextId++,
    title: req.body.title,
    description: req.body.description || "",
    completed: false,
  };

  tasks.push(task);
  res.status(201).json(task);
});

app.get("/tasks", (req, res) => {
  let result = [...tasks];

  if (req.query.search) {
    result = result.filter((t) => t.title.includes(req.query.search));
  }

  //pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const start = (page - 1) * limit;
  result = result.slice(start, start + limit);

  res.json(result);
});

app.get("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json(task);
});

app.put("/tasks/:id", (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: "task not found" });

  if (req.body.title !== undefined) task.title = req.body.title;
  if (req.body.completed !== undefined) task.completed = req.body.compleeted;

  res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
  const index = tasks.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Task not found" });

  tasks.splice(index, 1);
  res.status(204).send();
});

app.listen(3000, () => console.log("Server running on port 3000"));
