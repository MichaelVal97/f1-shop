<template>
  <div class="app">
    <header class="header">
      <div class="left" @click="$router.push('/')" style="cursor: pointer;">
        <img :src="F1Logo" alt="F1 Logo" class="logo" />
        <h1>F1 Tienda Mocoa</h1>
      </div>

      <div class="right">
        <button @click="$router.push('/')" class="btn home">Inicio</button>

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

    <main class="container fade-in">
      <router-view />
    </main>

    <footer class="footer">
      <p>© 2025 F1 Shop - Proyecto académico</p>
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
/* GENERAL */
.app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(180deg, #0a0a0a 0%, #161616 100%);
  color: var(--color-text);
  font-family: 'Segoe UI', Roboto, sans-serif;
  overflow-x: hidden;
}

/* HEADER */
.header {
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(20, 20, 20, 0.85);
  backdrop-filter: blur(8px);
  padding: 1rem 2rem;
  border-bottom: 2px solid #e10600;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  transition: 0.3s;
}

.left {
  display: flex;
  align-items: center;
  gap: 12px;
  transition: transform 0.3s;
}

.left:hover {
  transform: scale(1.05);
}

.logo {
  width: 60px;
  filter: drop-shadow(0 0 8px #e10600cc);
}

h1 {
  margin: 0;
  color: #fff;
  font-weight: 700;
  letter-spacing: 1px;
}

/* BOTONES */
.right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn {
  position: relative;
  overflow: hidden;
  padding: 0.6rem 1.3rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  color: white;
  font-weight: 600;
  letter-spacing: 0.3px;
  transition: all 0.3s ease;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0);
}

.btn::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(120deg, transparent, rgba(255,255,255,0.3), transparent);
  transition: all 0.6s;
}

.btn:hover::after {
  left: 100%;
}

.btn.home {
  background: #555;
}

.btn.login {
  background: #e10600;
}

.btn.register {
  background: #282828;
}

.btn.logout {
  background: #333;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 15px rgba(225, 6, 0, 0.5);
}

/* USER INFO */
.user {
  margin-right: 8px;
  color: var(--color-text);
  font-weight: 500;
}

/* MAIN */
.container {
  flex: 1;
  padding: 2rem;
  animation: fadeIn 0.8s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}

/* FOOTER */
.footer {
  text-align: center;
  padding: 1rem;
  background: rgba(20, 20, 20, 0.9);
  color: var(--color-gray);
  font-size: 0.9rem;
  border-top: 2px solid #e10600;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
}
</style>
