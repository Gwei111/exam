<template>
  <div>
  <el-drawer v-model="props.drawer">
    <span>Hi there!</span>
  </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const drawer = ref(false)
const emit=defineEmits(['Drawerclose'])
const props=defineProps([
  "drawer"
])

const hand=()=>{
  emit('Drawerclose',false)
}
</script>

<style scoped>

</style>