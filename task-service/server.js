const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3002;

app.use(cors());
app.use(express.json());

let tasks = [
  { id: 1, title: 'Finish distributed project', status: 'pending', userId: 1 },
  { id: 2, title: 'Prepare Kubernetes deployment', status: 'done', userId: 2 }
];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.get('/tasks/user/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const userTasks = tasks.filter(task => task.userId === userId);
  res.json(userTasks);
});

app.post('/tasks', (req, res) => {
  const { title, status, userId } = req.body;

  if (!title || !userId) {
    return res.status(400).json({ error: 'Title and userId are required' });
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    status: status || 'pending',
    userId: parseInt(userId)
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.listen(PORT, () => {
  console.log(`Task service running on http://localhost:${PORT}`);
});