<script setup>
import { ref, computed, onMounted } from 'vue'
import CartSidebar from './CartSidebar.vue'

const items = ref([])
const cart = ref([])
const loading = ref(true)
const error = ref(null)

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3030/api/items')
    items.value = await res.json()
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
})

function addToCart(item) {
  const found = cart.value.find(i => i.id === item.id)
  if (found) found.qty += 1
  else cart.value.push({ ...item, qty: 1 })
}

function decrement(id) {
  const index = cart.value.findIndex(i => i.id === id)
  if (index === -1) return
  if (cart.value[index].qty > 1) cart.value[index].qty--
  else cart.value.splice(index, 1)
}

function removeFromCart(id) {
  cart.value = cart.value.filter(i => i.id !== id)
}

const total = computed(() => cart.value.reduce((s, i) => s + i.price * i.qty, 0))
</script>

<template>
  <div class="shop">
    <section class="products">
      <h2>Productos oficiales F1</h2>
      <div v-if="loading">Cargando productos...</div>
      <div v-if="error">Error: {{ error }}</div>
      <div class="grid">
        <div v-for="item in items" :key="item.id" class="card">
          <img src="https://cdn.pixabay.com/photo/2018/02/21/15/06/helmet-3162052_1280.png" alt="F1 product" />
          <h3>{{ item.name }}</h3>
          <p class="price">${{ item.price.toFixed(2) }}</p>
          <button @click="addToCart(item)">Agregar al carrito</button>
        </div>
      </div>
    </section>

    <CartSidebar
      :cart="cart"
      :total="total"
      :addToCart="addToCart"
      :decrement="decrement"
      :removeFromCart="removeFromCart"
    />
  </div>
</template>

<style scoped>
.shop {
  display: flex;
  gap: 2rem;
  margin-top: 2rem;
}

.products {
  flex: 2;
}

h2 {
  color: var(--color-red);
  margin-bottom: 1rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}

.card {
  background-color: var(--color-card);
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: scale(1.03);
  box-shadow: 0 0 10px var(--color-red);
}

.card img {
  width: 100%;
  height: 150px;
  object-fit: contain;
}

.price {
  font-weight: bold;
  margin: 0.5rem 0;
}

button {
  background-color: var(--color-red);
  color: white;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  font-size: 0.9rem;
}

button:hover {
  background-color: #b00000;
}

@media (max-width: 768px) {
  .shop {
    flex-direction: column;
  }
}
</style>
