<template>
  <div class="shop-container animate-fade-in">
    <h2 class="shop-title">🏎 Tienda Oficial F1</h2>

    <div class="product-grid">
      <div 
        v-for="product in products" 
        :key="product.id" 
        class="product-card"
      >
        <img :src="product.image" alt="Producto" class="product-image" />
        <h3>{{ product.name }}</h3>
        <p class="product-price">${{ product.price.toLocaleString() }}</p>
        <button @click="addToCart(product)" class="btn-add">
          🛒 Agregar al carrito
        </button>
      </div>
    </div>

    <div class="cart-section" v-if="cart.length > 0">
      <h3 class="cart-title">🛍 Tu Carrito</h3>

      <div v-for="item in cart" :key="item.id" class="cart-item">
        <div class="cart-info">
          <strong>{{ item.name }}</strong>
          <span>${{ (item.price * item.quantity).toLocaleString() }}</span>
        </div>

        <div class="cart-controls">
          <button @click="decrease(item)" class="btn-qty">−</button>
          <span class="qty-display">{{ item.quantity }}</span>
          <button @click="increase(item)" class="btn-qty">+</button>
          <button @click="remove(item)" class="btn-remove">✖</button>
        </div>
      </div>

      <div class="cart-summary">
        <p>Total: <span class="cart-total">${{ totalPrice.toLocaleString() }}</span></p>
        <button class="btn-pay" @click="proceedToPayment">
          💳 Proceder al pago
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const products = ref([
  { id: 1, name: 'Gorra F1 Oficial', price: 80000, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg4Sv2WYQ0FQo8MZZ3uBDpST3wok5xVQ0y6w&s' },
  { id: 2, name: 'Camisa Red Bull', price: 120000, image: 'https://i.pinimg.com/474x/a0/01/e1/a001e1f88150c71599fe01e1a8dc74cd.jpg' },
  { id: 3, name: 'Llavero Ferrari', price: 52000, image: 'https://cdn.ferrari.com/cms/network/media/img/resize/%7CART_070000000-079999999%7CART_070006001-070009999%7C70006151%7CWEB%7C70006151_quadrato_RWFx1000.jpeg?bucket=genuine' },
])

const cart = ref([])

const addToCart = (product) => {
  const existing = cart.value.find(i => i.id === product.id)
  existing ? existing.quantity++ : cart.value.push({ ...product, quantity: 1 })
}

const increase = (item) => item.quantity++
const decrease = (item) => item.quantity > 1 && item.quantity--
const remove = (item) => cart.value = cart.value.filter(i => i.id !== item.id)

const totalPrice = computed(() =>
  cart.value.reduce((sum, i) => sum + i.price * i.quantity, 0)
)

// 🔐 Si no hay token, redirige al login antes del pago
function proceedToPayment() {
  const token = localStorage.getItem('token')
  if (!token) {
    if (confirm('⚠️ Debes iniciar sesión para continuar con el pago. ¿Ir al inicio de sesión?')) {
      router.push({ path: '/login', query: { redirect: '/checkout' } })
    }
  } else {
    router.push('/checkout')
  }
}
</script>

<style scoped>
.shop-container {
  text-align: center;
  color: white;
  padding: 2rem 1rem;
}

.shop-title {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--color-red);
  text-shadow: 0 0 8px rgba(216, 0, 0, 0.6);
}

/* === PRODUCTOS === */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

.product-card {
  background: var(--color-card);
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 0 15px rgba(255, 0, 0, 0.15);
  transition: transform 0.3s, box-shadow 0.3s;
}
.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0 25px rgba(255, 0, 0, 0.3);
}

.product-image {
  width: 100%;
  border-radius: 10px;
  margin-bottom: 0.8rem;
}

.product-price {
  color: var(--color-gray);
  margin-bottom: 0.6rem;
}

.btn-add {
  background-color: var(--color-red);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: background 0.3s ease;
}
.btn-add:hover {
  background-color: #ff2222;
}

/* === CARRITO === */
.cart-section {
  margin-top: 3rem;
  background: #181818;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.08);
}

.cart-title {
  color: var(--color-red);
  font-size: 1.4rem;
  margin-bottom: 1rem;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #202020;
  margin-bottom: 1rem;
  padding: 0.8rem 1rem;
  border-radius: 8px;
  transition: transform 0.2s ease;
}
.cart-item:hover {
  transform: scale(1.02);
}

.cart-controls {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.btn-qty {
  background: var(--color-red);
  color: white;
  border-radius: 5px;
  width: 28px;
  height: 28px;
  font-weight: bold;
  font-size: 1rem;
  transition: background 0.2s;
}
.btn-qty:hover {
  background: #ff2c2c;
}

.qty-display {
  width: 25px;
  text-align: center;
}

.btn-remove {
  background: transparent;
  color: #ccc;
  font-size: 1.1rem;
  cursor: pointer;
  transition: color 0.2s;
}
.btn-remove:hover {
  color: var(--color-red);
}

/* === TOTAL === */
.cart-summary {
  border-top: 1px solid #333;
  margin-top: 1rem;
  padding-top: 1rem;
  text-align: right;
}

.cart-total {
  color: var(--color-red);
  font-weight: bold;
}

.btn-pay {
  margin-top: 1rem;
  background: linear-gradient(90deg, var(--color-red), #ff4040);
  border: none;
  color: white;
  font-weight: bold;
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.2s, background 0.3s;
}
.btn-pay:hover {
  transform: scale(1.05);
  background: linear-gradient(90deg, #ff4040, #ff2222);
}

/* === ANIMACIONES === */
.animate-fade-in {
  animation: fadeIn 0.6s ease forwards;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
