// ===== CONFIG =====
const BASE_URL = "http://127.0.0.1:8000/api/v1";
const token = localStorage.getItem("access") || ""; // JWT Token

// ===== DARK MODE TOGGLE =====
const darkToggle = document.getElementById("darkModeToggle");
if (darkToggle) {
  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Save preference
    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "on");
    } else {
      localStorage.setItem("darkMode", "off");
    }
  });

  // Load preference
  if (localStorage.getItem("darkMode") === "on") {
    document.body.classList.add("dark-mode");
  }
}

// ===== FETCH ALL TABS =====
async function fetchTabs() {
  try {
    const res = await fetch(`${BASE_URL}/tabs/`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    });
    if (!res.ok) throw new Error("Failed to fetch tabs");

    const data = await res.json();
    renderTabs(data);
  } catch (err) {
    console.error(err);
  }
}

// ===== RENDER TABS =====
function renderTabs(tabs) {
  const tabList = document.getElementById("tabList");
  tabList.innerHTML = "";

  tabs.forEach(tab => {
    const li = document.createElement("li");
    li.className = "list-group-item";

    li.innerHTML = `
      <span>${tab.emoji} ${tab.name}</span>
      <div>
        <button class="btn btn-sm btn-warning me-2" onclick="openEditModal(${tab.id}, '${tab.name}', '${tab.emoji}')">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="deleteTab(${tab.id})">Delete</button>
      </div>
    `;

    tabList.appendChild(li);
  });
}

// ===== ADD TAB =====
async function addTab() {
  const name = document.getElementById("tabName").value;
  const emoji = document.getElementById("tabEmoji").value;

  if (!name || !emoji) {
    alert("Please enter both name and emoji");
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/tabs/`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, emoji })
    });

    if (!res.ok) throw new Error("Failed to add tab");

    document.getElementById("tabName").value = "";
    document.getElementById("tabEmoji").value = "";
    fetchTabs();
  } catch (err) {
    console.error(err);
  }
}

// ===== DELETE TAB =====
async function deleteTab(id) {
  if (!confirm("Are you sure you want to delete this tab?")) return;

  try {
    await fetch(`${BASE_URL}/tabs/${id}/`, {
      method: "DELETE",
      headers: { "Authorization": `Bearer ${token}` }
    });

    fetchTabs();
  } catch (err) {
    console.error(err);
  }
}

// ===== EDIT TAB =====
let currentTabId = null;

function openEditModal(id, name, emoji) {
  currentTabId = id;
  document.getElementById("editTabName").value = name;
  document.getElementById("editTabEmoji").value = emoji;

  const modal = new bootstrap.Modal(document.getElementById("editModal"));
  modal.show();
}

async function saveTabEdit() {
  const name = document.getElementById("editTabName").value;
  const emoji = document.getElementById("editTabEmoji").value;

  try {
    await fetch(`${BASE_URL}/tabs/${currentTabId}/`, {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, emoji })
    });

    const modal = bootstrap.Modal.getInstance(document.getElementById("editModal"));
    modal.hide();
    fetchTabs();
  } catch (err) {
    console.error(err);
  }
}

// ===== LOGOUT =====
function logout() {
  localStorage.removeItem("access");
  window.location.href = "/api/v1/auth/signin/"; // ya frontend login page
}

// ===== INIT =====
fetchTabs();
