const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const clearAllBtn = document.getElementById('clear-all');

// Load tasks from localStorage on page load
window.addEventListener('load', loadTasks);

// Add task
addTaskBtn.addEventListener('click', addTask);

// Remove task or mark as completed
taskList.addEventListener('click', handleTaskClick);

// Clear all tasks
clearAllBtn.addEventListener('click', clearAllTasks);

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button class="complete-btn"><i class="fas fa-check"></i></button>
                <button class="remove-btn"><i class="fas fa-times"></i></button>
            </div>
        `;
        if (task.completed) {
            li.classList.add('completed');
        }
        taskList.appendChild(li);
    });
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${taskText}</span>
            <div>
                <button class="complete-btn"><i class="fas fa-check"></i></button>
                <button class="remove-btn"><i class="fas fa-times"></i></button>
            </div>
        `;
        taskList.appendChild(li);
        taskInput.value = '';

        // Save tasks to localStorage
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ text: taskText, completed: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

function handleTaskClick(e) {
    const li = e.target.closest('li');
    if (e.target.classList.contains('complete-btn')) {
        li.classList.toggle('completed');
        updateTaskInStorage(li);
    } else if (e.target.classList.contains('remove-btn')) {
        taskList.removeChild(li);
        updateTasksInStorage();
    }
}

function updateTaskInStorage(li) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskText = li.firstChild.textContent;
    const updatedTasks = tasks.map(task => {
        if (task.text === taskText) {
            return { ...task, completed: li.classList.contains('completed') };
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

function updateTasksInStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => {
        const li = document.querySelector(`#task-list li span:contains("${task.text}")`);
        return li !== null;
    });
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

function clearAllTasks() {
    // Clear task list
    taskList.innerHTML = '';

    // Clear localStorage
    localStorage.removeItem('tasks');
}