// login.js - SPA con addEventListener

const API_URL = 'http://localhost:3000';

function login(event) {
  event.preventDefault();
  const id = document.getElementById("login-id").value;
  const pass = document.getElementById("login-password").value;

  fetch(`${API_URL}/users`)
    .then(res => res.json())
    .then(users => {
      const user = users.find(u => (u.email === id || u.username === id) && u.password === pass);
      if (user) {
        sessionStorage.setItem("auth", "true");
        sessionStorage.setItem("user", JSON.stringify(user));
        window.location.href = "index.html";
      } else {
        alert("Credenciales incorrectas");
      }
    });
}

function register(event) {
  event.preventDefault();
  const email = document.getElementById("reg-email").value;
  const username = document.getElementById("reg-username").value;
  const password = document.getElementById("reg-password").value;

  fetch(`${API_URL}/users?email=${email}`)
    .then(res => res.json())
    .then(existingByEmail => {
      if (existingByEmail.length > 0) {
        alert("Ese correo ya está en uso");
        return;
      }
      return fetch(`${API_URL}/users?username=${username}`)
        .then(res => res.json())
        .then(existingByUsername => {
          if (existingByUsername.length > 0) {
            alert("Ese nombre de usuario ya está en uso");
            return;
          }
          return fetch(`${API_URL}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email,
              username,
              password,
              createdAt: new Date().toISOString().split('T')[0]
            })
          });
        });
    })
    .then(res => {
      if (res && res.ok) {
        alert("Registro exitoso. Ahora inicia sesión.");
        hideRegister();
      }
    });
}

function showRegister() {
  document.getElementById("login-card").classList.add("d-none");
  document.getElementById("register-card").classList.remove("d-none");
}

function hideRegister() {
  document.getElementById("register-card").classList.add("d-none");
  document.getElementById("login-card").classList.remove("d-none");
}

// Conectar eventos al cargar el DOM
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("login-form")?.addEventListener("submit", login);
  document.getElementById("register-form")?.addEventListener("submit", register);
  document.getElementById("show-register")?.addEventListener("click", e => {
    e.preventDefault();
    showRegister();
  });
  document.getElementById("hide-register")?.addEventListener("click", e => {
    e.preventDefault();
    hideRegister();
  });
});
