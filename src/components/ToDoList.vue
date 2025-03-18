<template>
  <div class="container mx-auto p-8">
    <h1 class="text-4xl font-bold mb-6">My List</h1>

    <!-- Form pour ajouter une tâche -->
    <div class="mt-6 bg-white p-6 shadow-md rounded-lg">
      <h2 class="text-xl font-bold mb-4">Add a New Task</h2>
      <input v-model="newTaskName" type="text" placeholder="Task name" class="w-full p-2 border rounded-md mb-2" />

      <!-- Selection du client -->
      <select v-model="selectedClient" class="w-full p-2 border rounded-md mb-2">
        <option disabled value="">Select a client</option>
        <option v-for="client in clients" :key="client.username" :value="client.username">
          {{ client.first_name }} {{ client.last_name }} ({{ client.username }})
        </option>
      </select>

      <div class="flex justify-end space-x-4">
        <button @click="addTask" class="bg-green-600 text-white px-4 py-2 rounded-md">Add Task</button>
        <button @click="cancelTask" class="bg-gray-400 text-white px-4 py-2 rounded-md">Cancel</button>
      </div>
    </div>

    <!-- Affichage des taches -->
    <TaskList ref="taskListRef" />
  </div>
</template>

<script>
import UserDataService from '@/services/UserDataService'
import TaskList from '@/components/TaskList.vue'

export default {
  components: {
    TaskList
  },
  data () {
    return {
      newTaskName: '',
      selectedClient: '',
      clients: [],
      user: JSON.parse(localStorage.getItem('user')) || {}
    }
  },
  methods: {
    async fetchClients () {
      try {
        const response = await UserDataService.getClients()
        this.clients = response.data
      } catch (error) {
        console.error('Error fetching clients:', error)
      }
    },
    async addTask () {
      if (!this.newTaskName.trim() || !this.selectedClient) {
        alert('Please enter a task name and select a client.')
        return
      }

      if (!this.user.username) {
        alert('Error: No user found. Please log in again.')
        return
      }

      const taskData = {
        title: this.newTaskName,
        mechanicUsername: this.user.username,
        clientUsername: this.selectedClient
      }

      try {
        console.log('Send task :', taskData)
        await UserDataService.createTask(taskData)
        this.newTaskName = ''
        this.selectedClient = ''

        // Update TaskList after add
        this.$refs.taskListRef.fetchTasks()
      } catch (error) {
        console.error('Error adding task:', error.response?.data || error)
        alert('Failed to add task.')
      }
    }
  },
  mounted () {
    this.fetchClients()
  }
}
</script>
