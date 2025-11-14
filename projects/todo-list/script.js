const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("task-list");
const emptyMsg = document.getElementById("empty-msg");
const filterBtns = document.querySelectorAll(".filter-btn");
const clearBtn = document.getElementById("clear-btn");
const searchInput = document.getElementById("search-input");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";
let editIndex = null;

renderTasks();

addBtn.addEventListener("click", handleAddOrUpdate);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") handleAddOrUpdate();
});
searchInput.addEventListener("input", renderTasks);

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderTasks();
  });
});

clearBtn.addEventListener("click", () => {
  if (confirm("Clear all tasks?")) {
    tasks = [];
    saveTasks();
    renderTasks();
  }
});

function handleAddOrUpdate() {
  const text = input.value.trim();
  if (text === "") return;

  if (editIndex !== null) {
    tasks[editIndex].text = text;
    editIndex = null;
    addBtn.textContent = "Add";
  } else {
    tasks.push({ text, completed: false });
  }

  saveTasks();
  renderTasks();
  input.value = "";
}

function renderTasks() {
  list.innerHTML = "";
  let filtered = tasks;

  // Apply filter
  if (currentFilter === "completed") {
    filtered = filtered.filter((t) => t.completed);
  } else if (currentFilter === "pending") {
    filtered = filtered.filter((t) => !t.completed);
  }

  // Apply search
  const query = searchInput.value.toLowerCase();
  filtered = filtered.filter((t) => t.text.toLowerCase().includes(query));

  if (filtered.length === 0) {
    emptyMsg.style.display = "block";
    return;
  }

  emptyMsg.style.display = "none";
  filtered.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task ${task.completed ? "completed" : ""}`;
    li.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button onclick="editTask(${index})">✏</button>
        <button onclick="toggleTask(${index})">✔</button>
        <button onclick="deleteTask(${index})">✖</button>
      </div>
    `;

    // smooth fade-in effect
    li.style.animationDelay = `${index * 0.05}s`;
    list.appendChild(li);
  });
}

function editTask(index) {
  input.value = tasks[index].text;
  editIndex = index;
  addBtn.textContent = "Update";
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  const item = document.querySelectorAll(".task")[index];
  item.classList.add("fade-out");
  setTimeout(() => {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }, 300);
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
