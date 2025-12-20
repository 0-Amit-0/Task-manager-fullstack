const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// This array acts as our temporary database
let tasks = [
    { id: 1, title: "Learn Node.js", completed: false },
    { id: 2, title: "Build Portfolio", completed: false }
];

// 1. READ: Get all tasks
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// 2. CREATE: Add a new task
app.post('/api/tasks', (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        title: req.body.title,
        completed: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// 3. DELETE: Remove a task by ID
app.delete('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== id);
    res.json({ message: "Task deleted successfully" });
});

app.get('/', (req, res) => {
    res.send("Task Manager API is Live!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
