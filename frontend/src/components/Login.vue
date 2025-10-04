<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Iniciar Sesión</h2>

      <form @submit.prevent="loginUser" class="login-form">
        <div class="form-group">
          <label for="email">Correo electrónico</label>
          <input
            id="email"
            v-model="email"
            type="email"
            placeholder="Ingresa tu correo"
            required
          />
        </div>

        <div class="form-group">
          <label for="password">Contraseña</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Ingresa tu contraseña"
            required
          />
        </div>

        <button type="submit" class="btn-login">Ingresar</button>

        <p class="register-link">
          ¿No tienes cuenta?
          <router-link to="/register">Regístrate aquí</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()
const route = useRoute()

async function loginUser() {
  try {
    const res = await fetch('http://localhost:3030/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value.trim(),
        password: password.value.trim(),
      }),
    })

    const data = await res.json()

    if (res.ok && data.token) {
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      const redirect = route.query.redirect || '/'
      router.push(redirect)
    } else {
      alert(data.message || '❌ Credenciales incorrectas')
    }
  } catch (err) {
    alert('Error al conectar con el servidor')
    console.error(err)
  }
}
</script>

<style scoped>
/* estilos igual que antes, puedes conservar los tuyos */
</style>
