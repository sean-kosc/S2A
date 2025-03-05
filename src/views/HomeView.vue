<template>
  <section class="container mx-auto p-10 relative z-10">
    <div class="bg-gray-100 shadow-lg rounded-lg p-10 flex items-center justify-between gap-12">
      <!-- Texte à gauche -->
      <div class="flex-1 text-left space-y-5">
        <h3 class="text-5xl font-bold text-black">Mecha List</h3>
      <div class="mx-auto border-t border-gray-400 my-6"></div>
        <p class="text-2xl text-gray-500 leading-relaxed">Create and modify a To-Do List that you can share with your client.</p>
        <button class="bg-gray-800 text-white px-6 py-4 rounded-md mt-6 text-xl hover:scale-105 transition-transform duration-200">Create</button>
      </div>

      <!-- Image voiture avec fond gris -->
      <div class="bg-white p-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
        <img src="@/assets/Mechanic_Beaugendre.png" alt="Mechanic" class="rounded-lg shadow-lg w-[600px] mx-auto">
      </div>
    </div>
  </section>

  <section class="container mx-auto p-10 mt-4 relative z-10">
    <div class="bg-gray-100 shadow-lg rounded-lg p-10 flex items-center justify-between gap-12">
      <!-- Texte à gauche -->
      <div class="flex-1 text-left space-y-5">
        <h3 class="text-5xl font-bold text-black">My Vehicle</h3>
        <div class="mx-auto border-t border-gray-400 my-6"></div>
        <p class="text-2xl text-gray-500 leading-relaxed">Follow your vehicle’s repairs by have a check to your mechanic’s Mecha List</p>
        <button class="bg-black text-white px-6 py-4 rounded-md mt-6 text-xl hover:scale-105 transition-transform duration-200">Find My Vehicle</button>
      </div>

      <!-- Image voiture avec fond gris -->
      <div class="bg-white p-8 rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105">
        <img src="@/assets/Mechanic_Beaugendre.png" alt="Mechanic" class="rounded-lg shadow-lg w-[600px] mx-auto">
      </div>
    </div>
  </section>
</template>
