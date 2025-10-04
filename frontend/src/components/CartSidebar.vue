<script setup>
import { computed } from 'vue'
const props = defineProps({
  cart: Array,
  total: Number,
  addToCart: Function,
  decrement: Function,
  removeFromCart: Function
})

const hasItems = computed(() => props.cart.length > 0)
</script>

<template>
  <aside class="cart">
    <h2>🛒 Carrito</h2>

    <div v-if="!hasItems" class="empty">
      <p>Tu carrito está vacío</p>
    </div>

    <ul v-else>
      <li v-for="item in cart" :key="item.id" class="cart-item">
        <div class="info">
          <span>{{ item.name }}</span>
          <small>${{ item.price.toFixed(2) }}</small>
        </div>
        <div class="actions">
          <button @click="decrement(item.id)">-</button>
          <span>{{ item.qty }}</span>
          <button @click="addToCart(item)">+</button>
          <button class="remove" @click="removeFromCart(item.id)">✕</button>
        </div>
      </li>
    </ul>

    <div class="total" v-if="hasItems">
      <p>Total: <strong>${{ total.toFixed(2) }}</strong></p>
      <button class="checkout">Finalizar compra</button>
    </div>
  </aside>
</template>

<style scoped>
.cart {
  background-color: var(--color-card);
  border-left: 2px solid var(--color-red);
  padding: 1rem;
  border-radius: 8px;
  min-width: 280px;
  max-height: 85vh;
  overflow-y: auto;
}

h2 {
  margin-bottom: 1rem;
  color: var(--color-red);
}

.empty {
  text-align: center;
  color: var(--color-gray);
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #222;
  padding: 0.5rem 0;
}

.actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.actions button {
  background-color: #222;
  color: var(--color-white);
  padding: 4px 8px;
}

.actions button:hover {
  background-color: var(--color-red);
}

.remove {
  background: transparent;
  color: var(--color-red);
}

.total {
  text-align: center;
  margin-top: 1rem;
}

.checkout {
  margin-top: 1rem;
  width: 100%;
  background-color: var(--color-red);
  padding: 0.7rem;
  color: white;
}
</style>
