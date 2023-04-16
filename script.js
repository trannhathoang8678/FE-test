// Define global variables
const form = document.querySelector('#task-form');
const input = document.querySelector('#task-input');
const select = document.querySelector('#priority-select');
const tasksContainer = document.querySelector('#container');

let tasksArray = [];

// Function to create task element
function createTaskElement(task) {
const li = document.createElement('li');
li.setAttribute('data-id', task.id);
li.innerHTML = '<div class="task">' + task.task + '</div>' + '<div class="priority ' + task.priority + '">' + task.priority + '</div>' + '<button class="btn btn-complete">&#10004;</button>' + '<button class="btn btn-delete">&times;</button>';
return li;
}

// Function to add task element to column
function addTaskToColumn(taskElement, status, priority) {
const column = document.querySelector(`#${status} ul`);
column.appendChild(taskElement);
taskElement.querySelector('.btn-delete').addEventListener('click', function() {
const taskId = parseInt(taskElement.getAttribute('data-id'));
tasksArray = tasksArray.filter(task => task.id !== taskId);
updateLocalStorage();
taskElement.remove();
});
taskElement.querySelector('.btn-complete').addEventListener('click', function() {
const taskId = parseInt(taskElement.getAttribute('data-id'));
const task = tasksArray.find(task => task.id === taskId);
task.status = 'done';
updateLocalStorage();
const doneColumn = document.querySelector('#done ul');
doneColumn.appendChild(taskElement);
});
}

// Function to add task to DOM and array
function addTask(event) {
event.preventDefault();
if (input.value !== '') {
const task = {
id: Date.now(),
task: input.value,
priority: select.value,
status: 'todo'
};
tasksArray.push(task);
const li = createTaskElement(task);
addTaskToColumn(li, task.status, task.priority);
updateLocalStorage();
input.value = '';
select.value = 'low';
}
}

// Function to delete task
function deleteTask(event) {
if (event.target.classList.contains('btn-delete')) {
const taskElement = event.target.closest('li');
const taskId = parseInt(taskElement.getAttribute('data-id'));
tasksArray = tasksArray.filter(task => task.id !== taskId);
updateLocalStorage();
taskElement.remove();
}
}

// Function to load tasks from local storage
function loadTasks() {
const tasks = JSON.parse(localStorage.getItem('tasks'));
if (tasks) {
tasksArray = tasks;
tasks.forEach(task => {
const li = createTaskElement(task);
addTaskToColumn(li, task.status, task.priority);
});
}
}

// Function to update local storage
function updateLocalStorage() {
localStorage.setItem('tasks', JSON.stringify(tasksArray));
}

// Load tasks on page load
loadTasks();

// Add event listeners
tasksContainer.addEventListener('click', deleteTask);