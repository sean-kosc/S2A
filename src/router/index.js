import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserDashboard from '@/views/UserDashboard.vue'
import Login from '@/views/LoginView.vue'
import Signin from '@/views/SigninView.vue'
import MechanicToDoList from '@/views/MechanicToDoList.vue'
import ClientToDoList from '@/views/ClientToDoList.vue'
import Admin from '@/views/AdminPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: UserDashboard,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
  {
    path: '/mechanic_to_do_list',
    name: 'Mechanic_ToDoList',
    component: MechanicToDoList,
    meta: { requiresAuth: true, role: 'mechanic' }
  },
  {
    path: '/client_to_do_list',
    name: 'Client_ToDoList',
    component: ClientToDoList,
    meta: { requiresAuth: true, role: 'client' }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { requiresAuth: true, adminOnly: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('user')

  let userData
  try {
    userData = user ? JSON.parse(user) : null
  } catch (error) {
    console.error('Error parsing JSON :', error)
    userData = null
  }

  if (to.meta.requiresAuth && !userData) {
    alert('You need to log in first.')
    return next('/login')
  }

  if (to.meta.adminOnly && (!userData || userData.username !== 'admin')) {
    alert('Access denied.')
    return next('/')
  }

  if (to.meta.role && userData && userData.role !== to.meta.role) {
    alert('You do not have access to this page.')
    return next('/dashboard')
  }

  next()
})

export default router
