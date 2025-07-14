// main.js - Lógica SPA CrudNote básica con modo oscuro simplificado

const API_URL = 'http://localhost:3000'; // URL del json-server

// ---- Navegación SPA ----
function navigateTo(viewId) {
  document.querySelectorAll('.view').forEach(section => {
    section.hidden = true;
  });
  document.getElementById(viewId).hidden = false;
}

// ---- Cargar usuario desde sessionStorage ----
function loadUserProfile() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  if (!user) {
    window.location.href = "login.html";
    return;
  }
  document.getElementById("user-email").textContent = user.email;
  document.getElementById("user-username").textContent = user.username;
}

// ---- Crear nota ----
function createNote(event) {
  event.preventDefault();
  const title = document.getElementById("note-title").value;
  const content = document.getElementById("note-content").value;
  const user = JSON.parse(sessionStorage.getItem("user"));

  fetch(`${API_URL}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title,
      content,
      ownerId: user.id
    })
  })
    .then(res => res.json())
    .then(() => {
      document.getElementById("note-title").value = "";
      document.getElementById("note-content").value = "";
      loadNotes();
    });
}

// ---- Cargar notas del usuario ----
function loadNotes() {
  const user = JSON.parse(sessionStorage.getItem("user"));
  fetch(`${API_URL}/notes?ownerId=${user.id}`)
    .then(res => res.json())
    .then(notes => {
      const container = document.getElementById("notes-container");
      container.innerHTML = "";

      notes.forEach(note => {
        const div = document.createElement("div");
        div.className = "col-md-4 mb-3";
        div.innerHTML = `
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">${note.title}</h5>
              <p class="card-text">${note.content}</p>
            </div>
          </div>`;
        container.appendChild(div);
      });
    });
}

// ---- Cerrar sesión ----
function logout() {
  sessionStorage.clear();
  window.location.href = "login.html";
}


// ---- Inicializar SPA ----
document.addEventListener("DOMContentLoaded", () => {
  const user = sessionStorage.getItem("user");
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  loadUserProfile();
  loadNotes();
  navigateTo("home");

  applySavedTheme();
  document.getElementById("toggle-theme")?.addEventListener("click", toggleTheme);
});