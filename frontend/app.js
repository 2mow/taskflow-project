const API_URL = '/api';

async function loadUsers() {
  try {
    const response = await fetch(`${API_URL}/users`);
    const users = await response.json();

    const usersList = document.getElementById('usersList');
    usersList.innerHTML = '';

    users.forEach(user => {
      const div = document.createElement('div');
      div.className = 'item';
      div.innerHTML = `
        <strong>${user.name}</strong>
        <span>ID: ${user.id}</span><br>
        <span>Email: ${user.email}</span>
      `;
      usersList.appendChild(div);
    });
  } catch (error) {
    console.error('Error loading users:', error);
  }
}

async function loadTasks() {
  try {
    const response = await fetch(`${API_URL}/tasks`);
    const tasks = await response.json();

    const tasksList = document.getElementById('tasksList');
    tasksList.innerHTML = '';

    tasks.forEach(task => {
      const div = document.createElement('div');
      div.className = `item status-${task.status}`;
      div.innerHTML = `
        <strong>${task.title}</strong>
        <span>ID: ${task.id}</span><br>
        <span>Status: ${task.status}</span><br>
        <span>User ID: ${task.userId}</span>
      `;
      tasksList.appendChild(div);
    });
  } catch (error) {
    console.error('Error loading tasks:', error);
  }
}

document.getElementById('userForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('userName').value;
  const email = document.getElementById('userEmail').value;

  try {
    await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    });

    document.getElementById('userForm').reset();
    loadUsers();
  } catch (error) {
    console.error('Error creating user:', error);
  }
});

document.getElementById('taskForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('taskTitle').value;
  const status = document.getElementById('taskStatus').value;
  const userId = document.getElementById('taskUserId').value;

  try {
    await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, status, userId })
    });

    document.getElementById('taskForm').reset();
    loadTasks();
  } catch (error) {
    console.error('Error creating task:', error);
  }
});

loadUsers();
loadTasks();