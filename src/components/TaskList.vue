<template>
    <div class="container mx-auto p-8">
      <h1 class="text-4xl font-bold mb-6">My List</h1>

      <!-- FILTRER LES CLIENTS -->
        <div class="mb-4 text-center">
        <select v-model="selectedClient" @change="fetchTasks" class="p-2 border rounded">
            <option value="">All Clients</option>
            <option v-for="client in clients" :key="client.username" :value="client.username">
            {{ client.first_name }} {{ client.last_name }} ({{ client.username }})
            </option>
        </select>
        </div>

      <!-- BOUTONS DE NAV -->
      <div class="flex justify-center space-x-4 mb-6">
        <button
          @click="currentSection = 'todo'"
          :class="{ 'bg-purple-300': currentSection === 'todo' }"
          class="px-6 py-3 rounded-lg shadow-md transition">
          ✒️ To Do
        </button>

        <button
          @click="currentSection = 'doing'"
          :class="{ 'bg-orange-300': currentSection === 'doing' }"
          class="px-6 py-3 rounded-lg shadow-md transition">
          🛠️ Doing
        </button>

        <button
          @click="currentSection = 'done'"
          :class="{ 'bg-green-300': currentSection === 'done' }"
          class="px-6 py-3 rounded-lg shadow-md transition">
          ✅ Done
        </button>
      </div>

      <!-- LISTE DES TÂCHES -->
      <div class="bg-gray-200 shadow-lg rounded-lg p-6">
        <transition-group name="fade" tag="div">
          <div v-for="task in filteredTasks" :key="task.id" class="flex items-center justify-between p-4 border-b">
            <div>
              <h3 class="text-lg font-semibold">{{ task.title }}</h3>
              <p class="text-gray-600">🔧 Mechanic: {{ task.mechanicUsername }}</p>
              <p class="text-gray-600">👤 Client: {{ task.clientUsername }}</p>
            </div>

            <div class="flex space-x-2">
              <!-- BOUTON SUPPRIMER -->
              <button
                @click="deleteTask(task.id)"
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition">
                🗑️
              </button>

              <!-- BOUTON CHANGER ÉTAT -->
              <button
                v-if="task.status === 'todo'"
                @click="moveTask(task, 'doing')"
                class="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded transition">
                →
              </button>

              <button
                v-if="task.status === 'doing'"
                @click="moveTask(task, 'done')"
                class="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded transition">
                →
              </button>
            </div>
          </div>
        </transition-group>
      </div>

      <!-- MESSAGE SI PAS TÂCHE -->
      <p v-if="filteredTasks.length === 0" class="text-gray-500 text-center mt-4">No tasks found.</p>
    </div>
</template>

<script>
import UserDataService from '@/services/UserDataService'

export default {
  data () {
    return {
      currentSection: 'todo', // Default display (To Do)
      tasks: [], // List of database tasks
      clients: [], // Customer list
      selectedClient: '' // By default, all tasks are displayed
    }
  },
  computed: {
    filteredTasks () {
      return this.tasks.filter(task => task.status === this.currentSection)
    }
  },
  methods: {
    async fetchClients () {
      try {
        const response = await UserDataService.getClients()
        this.clients = response.data
      } catch (error) {
        console.error('Customer recovery error :', error)
      }
    },
    async fetchTasks () {
      try {
        let response
        if (this.selectedClient) {
          response = await UserDataService.getUserTasks(this.selectedClient) // Retrieves tasks for a specific client
        } else {
          response = await UserDataService.getAllTasks() // Recovers all tasks
        }
        this.tasks = response.data
      } catch (error) {
        console.error('Task retrieval error :', error)
      }
    },
    async moveTask (task, newStatus) {
      try {
        await UserDataService.updateTaskStatus(task.id, newStatus)
        this.fetchTasks() // Reload tasks after modification
      } catch (error) {
        console.error('Status change error :', error)
      }
    },
    async deleteTask (taskId) {
      try {
        await UserDataService.deleteTask(taskId)
        this.fetchTasks() // Reload tasks after delet
      } catch (error) {
        console.error('Job deletion error :', error)
      }
    }
  },
  mounted () {
    this.fetchClients() // Load customer list
    this.fetchTasks() // Load all tasks
  }
}
</script>

<style scoped>
/* Animation transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
