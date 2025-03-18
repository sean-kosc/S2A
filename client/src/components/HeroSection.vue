<template>
    <div class="relative overflow-hidden">
      <!-- Affichage dynamique de l'image -->
      <img :src="image"
           :alt="altText"
           class="mx-auto my-auto w-[60%] h-[60%] object-cover" />

      <!-- Overlay gris -->
      <div class="absolute top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex items-center justify-center text-white text-center">
        <div class="bg-black bg-opacity-30 shadow-lg rounded-lg">
          <h2 class="text-5xl font-bold">Vehicle condition</h2>
          <h3 class="text-6xl font-bold mt-2">{{ conditionText }}</h3>
        </div>
      </div>
    </div>
  </template>

<script>
export default {
  props: {
    isInRepair: {
      type: Boolean,
      required: true
    },
    altText: {
      type: String,
      default: 'Vehicle Background'
    }
  },
  computed: {
    // Détermine l’image et le texte selon l’état du véhicule
    image () {
      return this.isInRepair
        ? require('@/assets/repair_dashboard.png') // Image si en réparation
        : require('@/assets/repaired_dashboard.png') // Image si réparé
    },
    conditionText () {
      return this.isInRepair ? 'In repair' : 'Repaired'
    }
  }
}
</script>
