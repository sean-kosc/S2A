<template>

    <section class="container mx-auto px-8 mt-12">
        <h2 class="text-5xl text-black font-bold mb-8 text-left pr-10">Repair History</h2>

      <!-- Tableau des réparations avec effet de zoom au survol -->
       <div class="overflow-x-auto bg-white shadow-lg rounded-lg p-8
                  transform transition-transform duration-300 hover:scale-105">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b">
                <th class="py-4 px-6">
                <span class="inline-block w-7 h-7">
                  <img src="@/assets/mechanic_icon.png" alt="Mechanic Icon" class="w-full h-full rounded-full object-cover"/>
                </span> Mechanic
              </th>
              <th class="py-4 px-6">Reparation</th>
              <th class="py-4 px-6">Date</th>
              <th class="py-4 px-6 text-center">Statut</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="repair in repairs" :key="repair.id" class="border-b hover:bg-gray-100 transition-colors">
              <td class="py-4 px-6">{{ repair.mechanic }}</td>
              <td class="py-4 px-6">{{ repair.reparation }}</td>
              <td class="py-4 px-6">{{ repair.date }}</td>
              <td class="py-4 px-6 text-green-600 font-semibold flex items-center justify-center">
                <span class="inline-block w-6 h-6 mr-2">
                  <img src="@/assets/done_icon.png" alt="Done Icon" class="w-full h-full rounded-full object-cover"/>
                </span> Done
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
</template>

<script>
export default {
  props: {
    repairs: {
      type: Array,
      required: true
    }
  }
}
</script>

  <style scoped>
  th {
    font-weight: bold;
  }
  td {
    color: #4a4a4a;
  }
  </style>
