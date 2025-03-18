<template>
  <MainHeader v-if="showHeader"/>
  <router-view/>
  <MainFooter/>
</template>

<script>
import MainFooter from '@/components/MainFooter.vue'
import MainHeader from '@/components/MainHeader.vue'

export default {
  components: { MainFooter, MainHeader },
  computed: {
    showHeader () {
      return this.$route.name !== 'Dashboard' && this.$route.name !== 'Mechanic_ToDoList' && this.$route.name !== 'Client_ToDoList'
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}
</style>
