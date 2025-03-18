<template>
  <section class="container mx-auto p-10 mt-4 relative z-10">
      <h2 class="text-5xl text-black font-bold mb-8 text-left pr-10">My Car</h2>
      <div class="bg-white shadow-lg rounded-lg p-10 flex items-center justify-between gap-12 transform transition-transform duration-300 hover:scale-105">
        <div class="flex-1 text-left space-y-5">
          <h3 class="text-5xl font-bold text-black">{{ modelName }}</h3>
          <p class="text-2xl text-gray-500 leading-relaxed">
            Estimated time to completion of repair: <span class="font-semibold">{{ estimatedTime }} days</span>
          </p>
          <p class="text-2xl text-gray-500 leading-relaxed">Go to vehicle To-Do List</p>
          <button class="bg-black text-white px-6 py-4 rounded-md mt-6 text-xl hover:scale-105 transition-transform duration-200">To-do List</button>
        </div>

        <div class="bg-gray-200 p-8 rounded-lg shadow-lg">
          <img :src="computedCarImage" :alt="modelName" class="rounded-lg shadow-lg w-[500px] mx-auto">
        </div>
      </div>
  </section>
</template>

<script>
export default {
  props: {
    modelName: {
      type: String,
      required: true
    },
    estimatedTime: { // On utilise bien la prop passée depuis UserDashboard.vue
      type: Number,
      required: true
    },
    carImage: {
      type: String,
      required: true
    }
  },
  computed: {
    computedCarImage () {
      try {
        return require(`@/assets/${this.carImage}`)
      } catch (e) {
        console.error('Image not found:', this.carImage)
        return ''
      }
    }
  }
}
</script>
