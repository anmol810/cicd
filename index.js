const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// In-memory store
let todos = [];
let id = 0;

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// GET all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// CREATE todo
app.post("/todos", (req, res) => {
  const { text } = req.body;

  const newTodo = {
    _id: id++,
    text,
    completed: false,
  };

  todos.push(newTodo);
  res.json(newTodo);
});

// UPDATE todo
app.put("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);

  const todo = todos.find((t) => t._id === todoId);

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  todo.text = req.body.text ?? todo.text;
  todo.completed = req.body.completed ?? todo.completed;

  res.json(todo);
});

// DELETE todo
app.delete("/todos/:id", (req, res) => {
  const todoId = parseInt(req.params.id);

  todos = todos.filter((t) => t._id !== todoId);

  res.json({ message: "Deleted successfully" });
});

// START SERVER
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
