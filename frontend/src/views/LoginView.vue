<template>
  <div class="auth-container">
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="loginUser">
      <input v-model="email" placeholder="Correo" required />
      <input v-model="password" type="password" placeholder="Contraseña" required />
      <button type="submit">Ingresar</button>
    </form>
    <p>¿No tienes cuenta? <a @click="$router.push('/register')">Regístrate</a></p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");
const password = ref("");

async function loginUser() {
  const res = await fetch("http://localhost:3030/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.value, password: password.value }),
  });

  const data = await res.json();
  if (data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    alert("Bienvenido " + data.user.name);
    window.location.href = "/";
  } else {
    alert(data.message || "Error al iniciar sesión");
  }
}
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 60px auto;
  background: #111;
  padding: 20px;
  border-radius: 10px;
  color: white;
}
input {
  width: 100%;
  margin: 8px 0;
  padding: 10px;
}
button {
  background: #e10600;
  border: none;
  padding: 10px;
  width: 100%;
  color: white;
  cursor: pointer;
}
</style>
