<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="container">
    <div class="toolbar">Toolbar</div>
    <div class="container-list">Movie list here</div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
.toolbar {
  height: 50px;
  background-color: #f5f5f5;
}
</style>
