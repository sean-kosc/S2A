<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-white min-h-[79vh] mt-[-50px]">
    <div class="w-full max-w-md text-center bg-gray-100 p-6 rounded-lg shadow-lg">
      <!-- Titre -->
      <h1 class="text-5xl font-bold mb-6 text-left">Sign In</h1>

      <!-- Formulaire -->
      <form @submit.prevent="registerUser" class="space-y-6">
        <div class="text-left">
          <label class="block text-lg font-medium text-gray-900">First Name</label>
          <input v-model="user.first_name" type="text" placeholder="--Write here--" class="mt-1 w-full p-3 border rounded-md focus:ring-2 focus:ring-gray-900"/>
        </div>

        <div class="text-left">
          <label class="block text-lg font-medium text-gray-900">Last Name</label>
          <input v-model="user.last_name" type="text" placeholder="--Write here--" class="mt-1 w-full p-3 border rounded-md focus:ring-2 focus:ring-gray-900"/>
        </div>

        <div class="text-left">
          <label class="block text-lg font-medium text-gray-900">Email</label>
          <input v-model="user.email" type="email" placeholder="--Write here--" class="mt-1 w-full p-3 border rounded-md focus:ring-2 focus:ring-gray-900"/>
        </div>

        <div class="text-left">
          <label class="block text-lg font-medium text-gray-900">Username</label>
          <input v-model="user.username" type="text" placeholder="--Write here--" class="mt-1 w-full p-3 border rounded-md focus:ring-2 focus:ring-gray-900" maxlength="14"/>
          <p class="text-sm text-gray-500 mt-1">14 characters</p>
        </div>

        <div class="text-left">
          <label class="block text-lg font-medium text-gray-900">Password</label>
          <input v-model="user.password" type="password" placeholder="-- Write here --" class="mt-1 w-full p-3 border rounded-md focus:ring-2 focus:ring-gray-900"/>
        </div>

        <div class="text-left">
          <label class="block text-lg font-medium text-gray-900">Role</label>
          <div class="flex space-x-4">
            <button type="button" @click="user.role = 'client'" :class="{'bg-gray-800 text-white': user.role === 'client', 'bg-gray-300': user.role !== 'client'}" class="px-6 py-2 rounded-md">Client</button>
            <button type="button" @click="user.role = 'mechanic'" :class="{'bg-gray-800 text-white': user.role === 'mechanic', 'bg-gray-300': user.role !== 'mechanic'}" class="px-6 py-2 rounded-md">Mechanic</button>
          </div>
        </div>

        <!-- Bouton Create Account -->
        <button type="submit" class="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 transition">Create Account</button>
      </form>
    </div>
  </div>
</template>

<script>
import UserDataService from '../services/UserDataService'

export default {
  data () {
    return {
      user: {
        first_name: '',
        last_name: '',
        email: '',
        username: '',
        password: '',
        role: 'client' // défaut
      }
    }
  },
  methods: {
    async registerUser () {
      try {
        console.log('Données envoyées :', this.user)
        await UserDataService.create(this.user)
        alert('User registered successfully!')
      } catch (error) {
        console.error("Erreur lors de l'inscription :", error.response?.data || error.message)
      }
    }
  }
}
</script>
