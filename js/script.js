const form = document.getElementById('todo-form');
const taskInput = document.getElementById('task');
const dateInput = document.getElementById('date');
const statusSelect = document.getElementById('status-select');
const todoList = document.getElementById('todo-list');
const clearAllBtn = document.getElementById('clear-all');
const searchInput = document.getElementById('search');
const filterStatus = document.getElementById('filter-status');

const splashScreen = document.getElementById('splash-screen');
const mainApp = document.getElementById('main-app');

let todos = [];

function renderTodos(filterText = "", filterStat = "all") {
  todoList.innerHTML = "";
  todos
    .filter(todo => todo.task.toLowerCase().includes(filterText.toLowerCase()))
    .filter(todo => filterStat === "all" || todo.status === filterStat)
    .forEach((todo, idx) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${todo.task}</td>
        <td>${todo.date}</td>
        <td class="status-${todo.status.replace(/ /g, '\\ ')}">${todo.status.charAt(0).toUpperCase() + todo.status.slice(1)}</td>
        <td>
          <button class="action-status" onclick="changeStatus(${idx})">Ubah Status</button>
          <button class="action-button" onclick="deleteTodo(${idx})">Hapus</button>
        </td>
      `;
      todoList.appendChild(row);
    });
}

form.onsubmit = function(e) {
  e.preventDefault();
  if (!taskInput.value.trim() || !dateInput.value) {
    alert("Isi tugas & tanggalnya dulu yaa~");
    return;
  }
  todos.push({ task: taskInput.value, date: dateInput.value, status: statusSelect.value });
  taskInput.value = "";
  dateInput.value = "";
  statusSelect.value = "not yet";
  renderTodos(searchInput.value, filterStatus.value);
};

function deleteTodo(idx) {
  todos.splice(idx, 1);
  renderTodos(searchInput.value, filterStatus.value);
}

function changeStatus(idx) {
  const statuses = ["not yet", "on process", "done", "cancel"];
  let currentIndex = statuses.indexOf(todos[idx].status);
  let nextIndex = (currentIndex + 1) % statuses.length;
  todos[idx].status = statuses[nextIndex];
  renderTodos(searchInput.value, filterStatus.value);
}

clearAllBtn.onclick = function() {
  todos = [];
  renderTodos(searchInput.value, filterStatus.value);
};

searchInput.oninput = function() {
  renderTodos(this.value, filterStatus.value);
};

filterStatus.onchange = function() {
  renderTodos(searchInput.value, this.value);
};

// Splash screen handling: tampilkan splash selama 3 detik lalu tampilkan main app
window.onload = function() {
  setTimeout(() => {
    splashScreen.style.display = 'none';
    mainApp.classList.remove('hidden');
  }, 3000);
};

renderTodos();

window.deleteTodo = deleteTodo;
window.changeStatus = changeStatus;
