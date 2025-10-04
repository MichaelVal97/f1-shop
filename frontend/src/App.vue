<template>
  <div class="app">
    <!-- Header -->
    <header class="header">
      <img :src="F1Logo" alt="F1 Logo" class="logo" />
      <h1>F1 Tienda Mocoa</h1>
    </header>

    <!-- Main -->
    <main class="container">
      <F1Shop />
    </main>

    <!-- Footer -->
    <footer class="footer">
      <p>© 2025 F1 Shop - Proyecto académico</p>
    </footer>
  </div>
</template>

<script setup>
import F1Shop from './components/F1Shop.vue'
import F1Logo from './assets/f1-logo.png'
import './style.css'
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
  justify-content: center;
  gap: 12px;
  background-color: var(--color-card);
  padding: 1rem;
  border-bottom: 3px solid var(--color-red);
}

.logo {
  width: 60px;
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
