const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const noTasks = document.getElementById('noTasks');

let tasks = [];

window.addEventListener('DOMContentLoaded', () => {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTasks();
  }
});

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = taskInput.value.trim();
  if (text === '') return;
  tasks.push({ text, completed: false });
  taskInput.value = '';
  saveAndRender();
});

taskList.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    const index = e.target.dataset.index;
    tasks[index].completed = !tasks[index].completed;
    saveAndRender();
  } else if (e.target.classList.contains('delete-btn')) {
    const index = e.target.parentElement.dataset.index;
    tasks.splice(index, 1);
    saveAndRender();
  }
});

function saveAndRender() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = '';
  if (tasks.length === 0) {
    noTasks.style.display = 'block';
  } else {
    noTasks.style.display = 'none';
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.textContent = task.text;
      li.dataset.index = index;
      if (task.completed) li.classList.add('completed');

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Borrar';
      deleteBtn.classList.add('delete-btn');

      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    });
  }
}
