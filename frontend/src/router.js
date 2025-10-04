import { createRouter, createWebHistory } from 'vue-router'
import F1Shop from './components/F1Shop.vue'
import Login from './components/Login.vue'
// Si tienes registro:
import Register from './components/Register.vue'

const routes = [
  { path: '/', component: F1Shop },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
