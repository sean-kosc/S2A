<template>
    <DashboardHeader/>
    <div>
        <ToDoList :isClientView="true" />
    </div>
</template>

<script>
import DashboardHeader from '@/components/DashboardHeader.vue'
import ToDoList from '@/components/ToDoList.vue'

export default {
  components: {
    ToDoList,
    DashboardHeader
  }
}
</script>
