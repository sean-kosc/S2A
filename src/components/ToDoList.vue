<template>
    <div class="container mx-auto p-8">
      <h1 class="text-4xl font-bold mb-6">My List</h1>

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

      <!-- AFFICHAGE TACHES -->
      <div class="bg-gray-200 shadow-lg rounded-lg p-6">
        <transition-group name="fade" tag="div">
          <div v-for="task in filteredTasks" :key="task.id" class="flex items-center justify-between p-4 border-b">
            <div>
              <h3 class="text-lg font-semibold">{{ task.name }}</h3>
              <p class="text-gray-600">Mechanic : {{ task.mechanic }}</p>
            </div>

            <!-- BOUTON CHANGER ETAT -->
            <button
              v-if="!isClientView"
              @click="moveTask(task)"
              class="bg-gray-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded transition">→</button>
          </div>
        </transition-group>
      </div>

      <!-- FORMULAIRE AJOUT DE TACHE -->
      <div v-if="showAddTaskForm" class="mt-6 bg-white p-6 shadow-md rounded-lg">
        <h2 class="text-xl font-bold mb-4">Add a New Task</h2>
        <input v-model="newTaskName" type="text" placeholder="Task name" class="w-full p-2 border rounded-md mb-2" />
        <input v-model="newMechanicName" type="text" placeholder="Mechanic name" class="w-full p-2 border rounded-md mb-2" />

        <div class="flex justify-end space-x-4">
          <button @click="addTask" class="bg-green-600 text-white px-4 py-2 rounded-md">Add Task</button>
          <button @click="cancelTask" class="bg-gray-400 text-white px-4 py-2 rounded-md">Cancel</button>
        </div>
      </div>

      <!-- BOUTON "Add a Task" (DISPARAIT POUR LE CLIENT) -->
      <div v-if="!isClientView && !showAddTaskForm" class="mt-6 text-center">
        <button
          @click="showAddTaskForm = true"
          class="bg-black text-white px-6 py-3 rounded-md">Add a Task
        </button>
      </div>
    </div>
</template>

<script>
export default {
  props: {
    isClientView: { type: Boolean, default: false } // If you're a client, you can't edit
  },
  data () {
    return {
      currentSection: 'todo',
      tasks: [
        { id: 1, name: 'Changing brake pads', mechanic: 'Jean Dupont', status: 'todo' },
        { id: 2, name: 'Engine drain', mechanic: 'Jean Dupont', status: 'todo' },
        { id: 3, name: 'Replacing spark plugs', mechanic: 'Jean Dupont', status: 'todo' },
        { id: 4, name: 'Electronic diagnostics', mechanic: 'Jean Dupont', status: 'todo' },
        { id: 5, name: 'Windshield replacement', mechanic: 'Jean Dupont', status: 'todo' },
        { id: 6, name: 'Body paint and touch-ups', mechanic: 'Jean Dupont', status: 'todo' }
      ],
      showAddTaskForm: false, // Affichage du formulaire
      newTaskName: '',
      newMechanicName: ''
    }
  },
  computed: {
    filteredTasks () {
      return this.tasks.filter(task => task.status === this.currentSection)
    }
  },
  methods: {
    moveTask (task) {
      if (task.status === 'todo') {
        task.status = 'transitioning'
        setTimeout(() => {
          task.status = 'doing'
        }, 1000)
      } else if (task.status === 'doing') {
        task.status = 'transitioning'
        setTimeout(() => {
          task.status = 'done'
        }, 1000)
      }
    },
    addTask () {
      if (!this.newTaskName.trim() || !this.newMechanicName.trim()) {
        alert('Please enter a task name and a mechanic name')
        return
      }

      const newTask = {
        id: this.tasks.length + 1,
        name: this.newTaskName,
        mechanic: this.newMechanicName,
        status: 'todo'
      }

      this.tasks.push(newTask)

      // Réinitialise
      this.newTaskName = ''
      this.newMechanicName = ''
      this.showAddTaskForm = false
    },
    cancelTask () {
      this.showAddTaskForm = false
    }
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
