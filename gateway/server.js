const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const USER_SERVICE_URL = 'http://user-service:3001';
const TASK_SERVICE_URL = 'http://task-service:3002';

app.get('/api/users', async (req, res) => {
  try {
    const response = await axios.get(`${USER_SERVICE_URL}/users`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ error: 'Unable to fetch users' });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const response = await axios.post(`${USER_SERVICE_URL}/users`, req.body);
    res.status(201).json(response.data);
  } catch (error) {
    console.error('Error creating user:', error.message);
    res.status(500).json({ error: 'Unable to create user' });
  }
});

app.get('/api/tasks', async (req, res) => {
  try {
    const response = await axios.get(`${TASK_SERVICE_URL}/tasks`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching tasks:', error.message);
    res.status(500).json({ error: 'Unable to fetch tasks' });
  }
});

app.get('/api/tasks/user/:userId', async (req, res) => {
  try {
    const response = await axios.get(`${TASK_SERVICE_URL}/tasks/user/${req.params.userId}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching user tasks:', error.message);
    res.status(500).json({ error: 'Unable to fetch user tasks' });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const response = await axios.post(`${TASK_SERVICE_URL}/tasks`, req.body);
    res.status(201).json(response.data);
  } catch (error) {
    console.error('Error creating task:', error.message);
    res.status(500).json({ error: 'Unable to create task' });
  }
});

app.listen(PORT, () => {
  console.log(`Gateway running on http://localhost:${PORT}`);
});