<script setup>
import { ref, computed, onMounted } from 'vue';

const items = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3030/api/items');
    if (!res.ok) throw new Error('Error al obtener items');
    items.value = await res.json();
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
});

const cart = ref([]);

function addToCart(item) {
  const found = cart.value.find(i => i.id === item.id);
  if (found) found.qty += 1;
  else cart.value.push({ ...item, qty: 1 });
}

function decrement(itemId) {
  const idx = cart.value.findIndex(i => i.id === itemId);
  if (idx === -1) return;
  if (cart.value[idx].qty > 1) cart.value[idx].qty -= 1;
  else cart.value.splice(idx, 1);
}

function removeFromCart(itemId) {
  const idx = cart.value.findIndex(i => i.id === itemId);
  if (idx !== -1) cart.value.splice(idx, 1);
}

const total = computed(() => {
  return cart.value.reduce((sum, i) => sum + i.price * i.qty, 0).toFixed(2);
});
</script>

<template>
  <div class="shop">
    <h1>Tienda F1</h1>

    <div v-if="loading">Cargando productos...</div>
    <div v-if="error" class="error">Error: {{ error }}</div>

    <div class="layout">
      <section class="items">
        <h2>Productos</h2>
        <div class="grid">
          <article class="card" v-for="item in items" :key="item.id">
            <h3>{{ item.name }}</h3>
            <p>Precio: ${{ item.price.toFixed(2) }}</p>
            <button @click="addToCart(item)">Agregar</button>
          </article>
        </div>
      </section>

      <aside class="cart">
        <h2>Carrito</h2>
        <div v-if="cart.length === 0">Carrito vacío</div>
        <ul v-else>
          <li v-for="c in cart" :key="c.id">
            {{ c.name }} — {{ c.qty }} x ${{ c.price.toFixed(2) }} = ${{ (c.qty * c.price).toFixed(2) }}
            <button @click="decrement(c.id)">-</button>
            <button @click="addToCart(c)">+</button>
            <button @click="removeFromCart(c.id)">Eliminar</button>
          </li>
        </ul>
        <div class="total">Total: ${{ total }}</div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.layout { display:flex; gap:2rem; align-items:flex-start; }
.items { flex: 2; }
.cart { flex: 1; border-left:1px solid #ddd; padding-left:1rem; }
.grid { display:flex; flex-wrap:wrap; gap:1rem; }
.card { border:1px solid #eee; padding:1rem; border-radius:8px; width:200px; }
button { margin-left: 0.5rem; }
.total { margin-top: 1rem; font-weight: bold; }
</style>
