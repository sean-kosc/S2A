<template>
  <DashboardHeader/>
  <div class="container mx-auto p-8">
    <h1 class="text-4xl font-bold mb-6">My To-Do List</h1>

    <!-- BOUTONS DE NAV -->
    <div class="flex justify-center space-x-4 mb-6">
      <button
        @click="currentSection = 'todo'"
        :class="{'bg-purple-300': currentSection === 'todo'}"
        class="px-6 py-3 rounded-lg shadow-md transition">
        <span>✒️ To Do</span>
      </button>

      <button
        @click="currentSection = 'doing'"
        :class="{'bg-orange-300': currentSection === 'doing'}"
        class="px-6 py-3 rounded-lg shadow-md transition">
        <span>🛠️ Doing</span>
      </button>

      <button
        @click="currentSection = 'done'"
        :class="{'bg-green-300': currentSection === 'done'}"
        class="px-6 py-3 rounded-lg shadow-md transition">
        <span>✅ Done</span>
      </button>
    </div>

    <!-- AFFICHAGE DES TÂCHES -->
    <div class="bg-gray-200 shadow-lg rounded-lg p-6">
      <transition-group name="fade" tag="div">
        <div v-for="task in filteredTasks" :key="task.id" class="flex items-center justify-between p-4 border-b">
          <div>
            <h3 class="text-lg font-semibold">{{ task.title }}</h3>
            <p class="text-gray-600">🔧 Mechanic: {{ task.mechanicUsername }}</p>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import DashboardHeader from '@/components/DashboardHeader.vue'
import UserDataService from '../services/UserDataService'

export default {
  components: { DashboardHeader },
  data () {
    return {
      currentSection: 'todo',
      tasks: [],
      user: JSON.parse(localStorage.getItem('user')) || {}
    }
  },
  computed: {
    filteredTasks () {
      return this.tasks.filter(task => task.status === this.currentSection)
    }
  },
  methods: {
    async fetchTasks () {
      try {
        const response = await UserDataService.getUserTasks(this.user.username)
        this.tasks = response.data
      } catch (error) {
        console.error('Error fetching tasks:', error)
      }
    }
  },
  mounted () {
    this.fetchTasks()
  }
}
</script>

<style scoped>
/* Animation */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
