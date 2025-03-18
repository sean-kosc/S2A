<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-white min-h-[79vh] mt-[-50px]">
    <div class="w-full max-w-md text-center bg-gray-100 p-6 rounded-lg shadow-lg">
      <h1 class="text-5xl font-bold mb-6 text-left">Login</h1>

      <form @submit.prevent="loginUser" class="space-y-6">
        <div class="text-left">
          <label class="block text-lg font-medium text-gray-900">Username</label>
          <input v-model="user.username" type="text" placeholder="--Write here--"
                 class="mt-1 w-full p-3 border rounded-md focus:ring-2 focus:ring-gray-900" maxlength="14"/>
        </div>

        <div class="text-left">
          <label class="block text-lg font-medium text-gray-900">Password</label>
          <input v-model="user.password" type="password" placeholder="-- Write here --"
                 class="mt-1 w-full p-3 border rounded-md focus:ring-2 focus:ring-gray-900"/>
        </div>

        <button type="submit" class="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 transition">
          Log in
        </button>
      </form>

      <div class="flex items-center justify-center mt-4">
        <p class="text-gray-600">No username yet ?</p>
        <router-link to="/signin" class="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition">Sign in</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async loginUser () {
      if (!this.user.username || !this.user.password) {
        alert('Please enter both username and password.')
        return
      }

      if (this.user.username === 'admin' && this.user.password === 'admin123') {
        alert('Admin login successful')
        localStorage.setItem('user', JSON.stringify({ username: 'admin', role: 'admin' }))
        localStorage.setItem('role', 'admin')
        this.$router.push('/admin')
        return
      }

      try {
        console.log('Data sent :', JSON.stringify(this.user))

        const response = await axios.post('http://localhost:8080/api/user/login', this.user, {
          headers: { 'Content-Type': 'application/json' }
        })

        console.log('Server response :', response.data)

        const user = response.data.user

        if (user) {
          if (user.role === 'mechanic' && user.status === 'waiting') {
            alert('Your request to become a mechanic is still waiting for approval.')
            return
          }

          if (user.role === 'mechanic' && user.status === 'rejected') {
            alert('Your request to become a mechanic has been rejected.')
            return
          }

          localStorage.setItem('user', JSON.stringify(user))
          localStorage.setItem('role', user.role)
          localStorage.setItem('token', response.data.token)
          alert('Login successful')

          if (user.role === 'client') {
            this.$router.push('/client_to_do_list')
          } else if (user.role === 'mechanic') {
            this.$router.push('/mechanic_to_do_list')
          } else {
            alert('Access denied.')
          }
        }
      } catch (error) {
        console.error('Login error :', error.response?.data || error.message)
        alert(error.response?.data?.message || 'Login failed')
      }
    }
  }
}
</script>
