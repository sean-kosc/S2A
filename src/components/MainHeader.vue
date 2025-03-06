<template>
    <nav class="bg-white border-gray-200 dark:bg-white">
      <div class="max-w-screen-xl flex items-center justify-between mx-auto p-4">

        <!-- LOGO + NOM -->
        <router-link to="/" class="flex items-center space-x-3">
          <img src="@/assets/S2A_logo.png" class="h-16" alt="S2A Logo"/>
          <span class="self-center text-6xl font-semibold whitespace-nowrap text-black">S2A</span>
        </router-link>

        <!-- LIENS + BOUTON LOGIN -->
        <div class="flex items-center gap-6 ml-auto">
          <router-link to="/login" class="text-black hover:text-gray-600 font-medium">Create</router-link>
          <router-link to="/login" class="text-black hover:text-gray-600 font-medium">My Vehicle</router-link>

          <!-- Bouton Login bien aligné -->
          <router-link to="/login" class="bg-black text-white font-medium px-4 py-2 rounded-md hover:bg-gray-800 flex items-center">Login</router-link>
        </div>

      </div>
      <div class="w-4/5 mx-auto border-t border-gray-300 my-6"></div>
    </nav>
  </template>
