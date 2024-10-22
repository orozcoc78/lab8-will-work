// Get elements
const form = document.getElementById('todo-form');
const taskInput = document.getElementById('new-task');
const search = document.getElementById('data-form');
const searchVal = document.getElementById('new-save-list');

// Load tasks from local storage on page load
document.addEventListener('DOMContentLoaded', () => {
    (JSON.parse(localStorage.getItem('tasks')) || []).forEach(({ task, category }) => {
        addTask(task, category);
    });
});

// Add new task on form submit
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const task = taskInput.value;
    if (task) {
        addTask(task, 'todo-list');
        updateStorage();
        taskInput.value = '';
    }
});

search.addEventListener('submit', (e) => {
    e.preventDefault();
    const task = searchVal.value;
    if (task) {
        goTo = window.location.hostname + "&name=" + task + "&data=" + localStorage.getItem('tasks');
        window.location = goTo;
        localStorage.setItem('tasks', JSON.stringify(tasks))
        searchVal.value = '';
    }
})

// Add a task to a specific list
function addTask(task, listId) {
    const li = document.createElement('li');
    li.textContent = task;
    li.draggable = true;
    li.addEventListener('dragstart', (e) => e.dataTransfer.setData('text', task));
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', () => {
        li.remove();
        updateStorage();
    });
    
    li.appendChild(deleteBtn);
    document.getElementById(listId).appendChild(li);

    if (listId !== 'todo-list') deleteBtn.style.display = 'none'; // Hide delete button for non-To-Do lists
}

// Handle drag and drop
document.querySelectorAll('.task-list').forEach(list => {
    list.addEventListener('dragover', (e) => e.preventDefault());
    list.addEventListener('drop', (e) => {
        e.preventDefault();
        const taskText = e.dataTransfer.getData('text');
        const taskItem = [...document.querySelectorAll('li')].find(li => li.textContent.includes(taskText));
        if (taskItem) {
            list.appendChild(taskItem);
            taskItem.querySelector('.delete-btn').style.display = list.id === 'todo-list' ? 'inline' : 'none';
            updateStorage();
        }
    });
});

// Update local storage
function updateStorage() {
    const tasks = [...document.querySelectorAll('li')].map(li => ({
        task: li.textContent.replace('Delete', '').trim(),
        category: li.closest('.task-list').id
    }));
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
