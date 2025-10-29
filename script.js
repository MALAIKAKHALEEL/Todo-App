window.onload = () => {
  const savedDate = localStorage.getItem("savedDate");
  if (savedDate) {
    datePicker.value = savedDate;
    updateDayName(savedDate);
  }
  loadTasks();
};

datePicker.addEventListener("change", () => {
  const date = datePicker.value;
  localStorage.setItem("savedDate", date);
  updateDayName(date);
});

function updateDayName(date) {
  const day = new Date(date).toLocaleDateString("en-US", { weekday: 'long' });
  dayName.textContent = day;
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  const li = document.createElement("li");
  li.innerHTML = `
    <input type="checkbox">
    ${taskText}
    <button class="remove-btn" onclick="this.parentElement.remove()">Remove</button>
  `;
  taskList.appendChild(li);
  taskInput.value = "";
}

function saveTasks() {
  const tasks = [...taskList.children].map(li => ({
    text: li.childNodes[1].textContent.trim(),
    checked: li.querySelector("input").checked,
  }));
  localStorage.setItem("todoTasks", JSON.stringify(tasks));
  alert("Tasks saved!");
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("todoTasks")) || [];
  tasks.forEach(({ text, checked }) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" ${checked ? "checked" : ""}>
      ${text}
      <button class="remove-btn" onclick="this.parentElement.remove()">Remove</button>
    `;
    taskList.appendChild(li);
  });
}

function clearTasks() {
  localStorage.removeItem("todoTasks");
  taskList.innerHTML = "";
}

