<template>
  <div class="checkout-container animate-fade-in">
    <h2 class="checkout-title">💳 Confirmar compra</h2>

    <div class="checkout-card">
      <p>Gracias por tu compra en la <strong>Tienda Oficial F1</strong>.</p>
      <p>Tu pedido está siendo procesado y recibirás la confirmación en breve.</p>

      <button @click="goHome" class="btn-home">🏠 Volver al inicio</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function goHome() {
  router.push('/')
}
</script>

<style scoped>
.checkout-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  color: white;
  text-align: center;
  padding: 1rem;
}

.checkout-title {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: var(--color-red);
  text-shadow: 0 0 8px rgba(216, 0, 0, 0.6);
}

.checkout-card {
  background: var(--color-card);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 0 20px rgba(255, 0, 0, 0.2);
  max-width: 500px;
  animation: fadeIn 0.8s ease;
}

.btn-home {
  margin-top: 1.5rem;
  background: linear-gradient(90deg, var(--color-red), #ff4040);
  border: none;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s, background 0.3s;
}
.btn-home:hover {
  transform: scale(1.05);
  background: linear-gradient(90deg, #ff4040, #ff2222);
}

/* Animación */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
