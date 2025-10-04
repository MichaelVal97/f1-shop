<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  cart: { type: Array, default: () => [] },
  total: { type: Number, default: 0 },
  addToCart: Function,
  decrement: Function,
  removeFromCart: Function
})

const router = useRouter()

const hasItems = computed(() => Array.isArray(props.cart) && props.cart.length > 0)

function checkout() {
  try {
    const token = localStorage.getItem('token')
    console.log('[CartSidebar] checkout clicked — token:', token)

    if (!token) {
      // Confirm visual para el usuario antes de redirigir
      const go = confirm('⚠️ Debes iniciar sesión para continuar con el pago. ¿Ir a Iniciar sesión ahora?')
      if (go) {
        // añadimos query redirect para poder regresar
        router.push({ path: '/login', query: { redirect: router.currentRoute.value.fullPath || '/' } })
      }
      return
    }

    // Si tienes una ruta /checkout:
    // router.push('/checkout')
    // Por ahora simulamos pedido o redirigimos a una ruta de pago
    alert('✅ Estás logueado. Procediendo al checkout...')
    router.push('/checkout') // crea esta ruta si la vas a usar o cambia por la acción que requieras
  } catch (err) {
    console.error('[CartSidebar] checkout error', err)
    alert('Ocurrió un error al intentar proceder al pago.')
  }
}
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
          <small>${{ (item.price || 0).toFixed(2) }}</small>
        </div>
        <div class="actions">
          <!-- Llamamos a las funciones pasadas como props, con guardas -->
          <button @click="(props.decrement ? props.decrement(item.id ?? item) : null)">-</button>
          <span>{{ item.qty ?? item.quantity ?? 1 }}</span>
          <button @click="(props.addToCart ? props.addToCart(item) : null)">+</button>
          <button class="remove" @click="(props.removeFromCart ? props.removeFromCart(item.id ?? item) : null)">✕</button>
        </div>
      </li>
    </ul>

    <div class="total" v-if="hasItems">
      <p>Total: <strong>${{ (total || 0).toFixed(2) }}</strong></p>
      <button class="checkout" @click="checkout">Proceder al pago</button>
    </div>
  </aside>
</template>

<style scoped>
/* deja tus estilos previos o pega los que ya tenías */
.cart {
  background-color: var(--color-card);
  border-left: 2px solid var(--color-red);
  padding: 1rem;
  border-radius: 8px;
  min-width: 280px;
  max-height: 85vh;
  overflow-y: auto;
  transition: all 0.3s ease;
}
.cart:hover { box-shadow: 0 0 10px var(--color-red); }
h2 { margin-bottom: 1rem; color: var(--color-red); }
.empty { text-align: center; color: var(--color-gray); font-style: italic; }
.cart-item { display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #222; padding:0.5rem 0; }
.actions { display:flex; align-items:center; gap:6px; }
.actions button { background:#222; color:var(--color-white); padding:4px 8px; border-radius:5px; }
.actions button:hover { background:var(--color-red); transform:scale(1.05); }
.remove { background:transparent; color:var(--color-red); font-weight:bold; }
.total { text-align:center; margin-top:1rem; border-top:1px solid #333; padding-top:1rem; }
.checkout { width:100%; background:var(--color-red); padding:0.7rem; color:white; border-radius:8px; }
.checkout:hover { background:#b00000; transform:translateY(-2px); }
</style>
