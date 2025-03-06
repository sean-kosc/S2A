<template>
    <div class="flex flex-col items-center justify-center min-h-screen bg-white min-h-[79vh] mt-[-50px]">
      <div class="w-full max-w-md text-center">
        <!-- Titre -->
        <h1 class="text-5xl font-bold mb-6 text-left">Login</h1>

        <!-- Formulaire -->
        <form class="space-y-6">
          <!-- Champ Username -->
          <div class="text-left">
            <label class="block text-lg font-medium text-gray-900">Username</label>
            <input type="text" placeholder="--Write here--" class="mt-1 w-full p-3 border rounded-md focus:ring-2 focus:ring-gray-900" maxlength="14"/>
            <p class="text-sm text-gray-500 mt-1">14 characters</p>
          </div>
          <!-- Champ Registration Plate -->
          <div class="text-left">
            <label class="block text-lg font-medium text-gray-900">Registration Plate</label>
            <input type="text" placeholder="-- Write here --" class="mt-1 w-full p-3 border rounded-md focus:ring-2 focus:ring-gray-900"/>
            <p class="text-sm text-gray-500 mt-1">No need to put the "-"</p>
          </div>

          <!-- Bouton Log in -->
          <router-link to="/dashboard" class="flex">
            <button class="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 transition">Log in</button>
        </router-link>
        </form>

        <!-- Texte No username yet + Bouton Sign in -->
        <div class="flex items-center justify-center mt-4">
          <p class="text-gray-600">No username yet ?</p>
          <button class="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition">Sign in</button>
        </div>
      </div>
    </div>
  </template>

<script>
</script>
