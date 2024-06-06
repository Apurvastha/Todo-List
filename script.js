const todoList = document.getElementById('todo-list');
const todoInput = document.getElementById('todo-input');
const addTodoButton = document.getElementById('add-todo');
const deleteSelectedIcon = document.getElementById('delete-selected');
const selectAllCheckbox = document.getElementById('select-all');

addTodoButton.addEventListener('click', addTodo);
todoInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    addTodo();
  }
});
deleteSelectedIcon.addEventListener('click', deleteSelected);
selectAllCheckbox.addEventListener('change', selectAll);

// Add event listeners to close icons and checkboxes for dummy tasks
const closeIcons = document.querySelectorAll('.close-icon');
const taskCheckboxes = document.querySelectorAll('.task-checkbox');

closeIcons.forEach((icon, index) => {
  icon.addEventListener('click', removeTodo.bind(null, todoList.children[index]));
});

taskCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', toggleTodo);
});

function addTodo() {
  const todoText = todoInput.value.trim();
  if (todoText !== '') {
    const todoItem = document.createElement('li');
    const taskCheckbox = document.createElement('input');
    taskCheckbox.type = 'checkbox';
    taskCheckbox.className = 'task-checkbox';
    taskCheckbox.addEventListener('change', toggleTodo);
    const todoItemSpan = document.createElement('span');
    todoItemSpan.className = 'todo-item';
    todoItemSpan.textContent = todoText;
    const closeIcon = document.createElement('span');
    closeIcon.className = 'close-icon';
    closeIcon.innerHTML = '&#10005;';
    closeIcon.addEventListener('click', removeTodo.bind(null, todoItem));
    todoItem.appendChild(taskCheckbox);
    todoItem.appendChild(todoItemSpan);
    todoItem.appendChild(closeIcon);
    todoList.appendChild(todoItem);
    todoInput.value = '';
  }
}

function removeTodo(todoItem) {
  todoList.removeChild(todoItem);
}

function toggleTodo(event) {
  const todoItem = event.target.parentNode;
  const todoText = todoItem.querySelector('.todo-item');
  todoText.classList.toggle('completed');
}

function deleteSelected() {
  const checkboxes = document.querySelectorAll('.task-checkbox:checked');
  checkboxes.forEach(checkbox => {
    const todoItem = checkbox.parentNode;
    todoList.removeChild(todoItem);
  });
}

function selectAll(event) {
  const checkboxes = document.querySelectorAll('.task-checkbox');
  checkboxes.forEach(checkbox => {
    checkbox.checked = event.target.checked;
  });
}