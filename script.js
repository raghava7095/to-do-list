const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const clearAllBtn = document.getElementById('clear-all');

// Load tasks from localStorage on page load
window.addEventListener('load', loadTasks);

// Add task
addTaskBtn.addEventListener('click', addTask);

// Remove task
taskList.addEventListener('click', removeTask);

// Clear all tasks
clearAllBtn.addEventListener('click', clearAllTasks);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task}</span>
            <button><i class="fas fa-times"></i></button>
        `;
        taskList.appendChild(li);
    });
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${taskText}</span>
            <button><i class="fas fa-times"></i></button>
        `;
        taskList.appendChild(li);
        taskInput.value = '';

        // Save tasks to localStorage
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function removeTask(e) {
    if (e.target.tagName === 'I') {
        const li = e.target.parentElement.parentElement;
        taskList.removeChild(li);

        // Update tasks in localStorage
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const taskText = li.firstChild.textContent;
        const updatedTasks = tasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }
}

function clearAllTasks() {
    // Clear task list
    taskList.innerHTML = '';

    // Clear localStorage
    localStorage.removeItem('tasks');
}