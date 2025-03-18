<template>
  <div class="flex flex-col items-center justify-center bg-white">
    <div class="w-full max-w-2xl bg-gray-100 p-6 rounded-lg shadow-lg text-center">
      <h1 class="text-3xl font-bold mb-6">Waiting Mechanics</h1>
      <ul class="w-full space-y-4">
        <li v-for="mechanic in waitingMechanics" :key="mechanic.id" class="flex justify-between items-center bg-white p-4 rounded-md shadow">
          <p class="text-lg font-medium">{{ mechanic.first_name }} {{ mechanic.last_name }} - {{ mechanic.email }}</p>
          <div class="flex space-x-2">
            <button class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition" @click="updateStatus(mechanic.id, 'approved')">✅ Approve</button>
            <button class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition" @click="updateStatus(mechanic.id, 'rejected')">❌ Reject</button>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      waitingMechanics: []
    }
  },
  methods: {
    async fetchWaitingMechanics () {
      try {
        const response = await axios.get('http://localhost:8080/api/user/waiting-mechanics')
        this.waitingMechanics = response.data
      } catch (error) {
        console.error('Error fetching waiting mechanics:', error)
      }
    },
    async updateStatus (id, status) {
      try {
        await axios.put('http://localhost:8080/api/user/update-status', { id, status })
        alert(`Mechanic ${status} successfully`)
        this.fetchWaitingMechanics() // Refresh list
      } catch (error) {
        console.error('Error updating status:', error)
      }
    }
  },
  mounted () {
    this.fetchWaitingMechanics()
  }
}
</script>
