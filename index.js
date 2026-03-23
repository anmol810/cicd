const express = require("express");
const app = express();

app.use(express.json());

let todos = ["Sample anmol dneidnoidnoenb", "benicoe Todo"].map(
  (title, index) => ({
    id: index + 1,
    title,
    completed: false,
  })
);

// GET all todos
app.get("/todos", (req, res) => {
  res.json(todos);
});

// ADD todo
app.post("/todos", (req, res) => {
  const { title } = req.body;
  const newTodo = {
    id: Date.now(),
    title,
    completed: false,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// UPDATE todo
app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((t) => t.id === id);

  if (!todo) return res.status(404).json({ message: "Not found" });

  todo.completed = !todo.completed;
  res.json(todo);
});

// DELETE todo
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter((t) => t.id !== id);
  res.json({ message: "Deleted" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
