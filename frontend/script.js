const API_URL = "https://your-render-url-here.onrender.com/api/tasks";
const API_URL = "http://localhost:5000/api/tasks";

// Function to fetch tasks from the backend and show them
async function fetchTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = "flex justify-between items-center bg-gray-50 p-3 rounded shadow-sm";
        li.innerHTML = `
            <span>${task.title}</span>
            <button onclick="deleteTask(${task.id})" class="text-red-500 hover:text-red-700">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

// Function to add a new task
async function addTask() {
    const input = document.getElementById('taskInput');
    const title = input.value;

    if (!title) return alert("Please type something!");

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    });

    input.value = '';
    fetchTasks(); // Refresh the list
}

// Function to delete a task
async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchTasks(); // Refresh the list
}

// Load tasks when the page opens
fetchTasks();
