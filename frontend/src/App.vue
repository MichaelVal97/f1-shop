<template>
  <div class="app">
    <header class="header">
      <div class="left" @click="$router.push('/')" style="cursor: pointer;">
        <img :src="F1Logo" alt="F1 Logo" class="logo" />
        <h1>F1 Tienda Mocoa</h1>
      </div>

      <div class="right">
        <!-- Botón para volver al inicio -->
        <button @click="$router.push('/')" class="btn home">Tienda</button>

        <template v-if="!isLoggedIn">
          <button @click="$router.push('/login')" class="btn login">Iniciar sesión</button>
          <button @click="$router.push('/register')" class="btn register">Registrarse</button>
        </template>

        <template v-else>
          <span class="user">Hola, {{ user.name || 'Usuario' }}</span>
          <button @click="logout" class="btn logout">Cerrar sesión</button>
        </template>
      </div>
    </header>

    <main class="container">
      <router-view />
    </main>

    <footer class="footer">
      <p>© 2025 F1 Tienda Mocoa </p>
    </footer>
  </div>
</template>

<script setup>
import F1Logo from './assets/f1-logo.png'
import './style.css'
import { ref, onMounted } from 'vue'

const isLoggedIn = ref(false)
const user = ref({})

onMounted(() => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    user.value = JSON.parse(storedUser)
    isLoggedIn.value = true
  }
})

function logout() {
  localStorage.clear()
  isLoggedIn.value = false
  user.value = {}
  window.location.href = '/'
}
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: var(--color-bg);
  color: var(--color-text);
  font-family: 'Segoe UI', Roboto, sans-serif;
}

/* Header */
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--color-card);
  padding: 1rem 2rem;
  border-bottom: 3px solid var(--color-red);
}

.left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo {
  width: 60px;
}

h1 {
  margin: 0;
}

/* Botones */
.btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: white;
  font-weight: 600;
  transition: 0.3s;
}

.btn.home {
  background: #555;
}

.btn.login {
  background: #e10600;
}

.btn.register {
  background: #333;
}

.btn.logout {
  background: #444;
}

.btn:hover {
  opacity: 0.8;
}

.user {
  margin-right: 8px;
  color: var(--color-text);
}

/* Main */
.container {
  flex: 1;
  padding: 2rem;
}

/* Footer */
.footer {
  margin-top: auto;
  text-align: center;
  padding: 1rem;
  background: var(--color-card);
  color: var(--color-gray);
  font-size: 0.9rem;
}
</style>
