const adminTasksContainer = document.getElementById("adminTasks");
const totalTasks = document.getElementById("totalTasks");
const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");
const themeToggle = document.getElementById("theme-toggle");

let tasks = JSON.parse(localStorage.getItem("tasks")) || {};

function renderAdminTasks() {
  adminTasksContainer.innerHTML = "";
  let total = 0, pending = 0, completed = 0;

  Object.keys(tasks).forEach(date => {
    tasks[date].forEach((t, i) => {
      total++;
      const now = new Date();
      const end = new Date(t.deadline);
      const diff = end - now;
      const timeLeft = diff > 0 ? calculateTimeLeft(t.deadline) : "⏰ Time's up!";

      const tr = document.createElement("tr");

      const tdTask = document.createElement("td");
      tdTask.textContent = t.text;

      const tdDeadline = document.createElement("td");
      tdDeadline.textContent = new Date(t.deadline).toLocaleString();

      const tdTimeLeft = document.createElement("td");
      tdTimeLeft.textContent = timeLeft;

      const tdStatus = document.createElement("td");
      let status = diff > 0 ? "Pending" : "Completed";
      tdStatus.textContent = status;
      if (status === "Pending") pending++; else completed++;

      const tdActions = document.createElement("td");
      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete";
      delBtn.classList.add("delete-btn");
      delBtn.onclick = () => {
        tasks[date].splice(i, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderAdminTasks();
      };

      const compBtn = document.createElement("button");
      compBtn.textContent = "Complete";
      compBtn.classList.add("complete-btn");
      compBtn.onclick = () => {
        t.deadline = new Date().toISOString(); // Mark as done
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderAdminTasks();
      };

      tdActions.appendChild(compBtn);
      tdActions.appendChild(delBtn);

      tr.appendChild(tdTask);
      tr.appendChild(tdDeadline);
      tr.appendChild(tdTimeLeft);
      tr.appendChild(tdStatus);
      tr.appendChild(tdActions);
      adminTasksContainer.appendChild(tr);
    });
  });

  totalTasks.textContent = total;
  pendingTasks.textContent = pending;
  completedTasks.textContent = completed;
}

function calculateTimeLeft(deadline) {
  const now = new Date();
  const end = new Date(deadline);
  const diff = end - now;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);

  if (days > 0) return `${days}d ${hours}h ${minutes}m`;
  else if (hours > 0) return `${hours}h ${minutes}m`;
  else return `${minutes}m`;
}

// Theme toggle
themeToggle.onclick = () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "🌙" : "🌞";
};

renderAdminTasks();
setInterval(renderAdminTasks, 60000);
