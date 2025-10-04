<template>
  <div class="auth-container">
    <h2>Registrarse</h2>
    <form @submit.prevent="registerUser">
      <input v-model="name" placeholder="Nombre completo" required />
      <input v-model="email" placeholder="Correo electrónico" required />
      <input v-model="password" type="password" placeholder="Contraseña" required />
      <button type="submit">Crear cuenta</button>
    </form>
    <p>¿Ya tienes cuenta? <a @click="$router.push('/login')">Inicia sesión</a></p>
  </div>
</template>

<script setup>
import { ref } from "vue";

const name = ref("");
const email = ref("");
const password = ref("");

async function registerUser() {
  const res = await fetch("http://localhost:3030/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name.value,
      email: email.value,
      password: password.value,
    }),
  });

  const data = await res.json();

  if (res.ok) {
    alert("Registro exitoso, ahora puedes iniciar sesión.");
    window.location.href = "/login";
  } else {
    alert(data.message || "Error al registrar el usuario.");
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
