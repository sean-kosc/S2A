import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserDashboard from '@/views/UserDashboard.vue'
import Login from '@/views/LoginView.vue'
import MechanicToDoList from '@/views/MechanicToDoList.vue'
import ClientToDoList from '@/views/ClientToDoList.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: UserDashboard
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/mechanic_to_do_list',
    name: 'Mechanic_ToDoList',
    component: MechanicToDoList
  },
  {
    path: '/client_to_do_list',
    name: 'Client_ToDoList',
    component: ClientToDoList
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
