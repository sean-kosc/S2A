<template>
    <div class="bg-gray-100 min-h-screen">
      <!-- Header -->
      <DashboardHeader/>

      <!-- Hero Section (dynamique en fonction de isInRepair) -->
      <HeroSection :isInRepair= "isInRepair"/>

      <UserCarSection modelName="Mercedes-AMG GT" estimatedTime="5" carImage="Mercedes-AMG GT.png"/>

      <div class="w-4/5 mx-auto border-t border-gray-300 my-6"></div>

    <RepairHistory :repairs="repairs" />

      <!-- Footer -->
      <MainFooter />
    </div>
</template>

<script>
import DashboardHeader from '@/components/DashboardHeader.vue'
import MainFooter from '@/components/MainFooter.vue'
import HeroSection from '@/components/HeroSection.vue'
import RepairHistory from '@/components/RepairHistory.vue'
import UserCarSection from '@/components/UserCarSection.vue'

export default {
  components: {
    DashboardHeader,
    MainFooter,
    HeroSection,
    RepairHistory,
    UserCarSection
  },
  data () {
    return {
      isInRepair: true, // Remplace cette valeur par une donnée du serveur
      repairs: [
        { id: 1, mechanic: 'Jean Dupont', reparation: 'Changing brake pads', date: '2024-02-15' },
        { id: 2, mechanic: 'Ali Benomar', reparation: 'Complete engine overhaul', date: '2024-01-28' },
        { id: 3, mechanic: 'Laura Martinez', reparation: 'Replacing the battery', date: '2023-12-10' },
        { id: 4, mechanic: 'Anthony Beaugendre', reparation: 'Body paint and touch-up', date: '2023-11-05' }
      ]
    }
  }
}
</script>
