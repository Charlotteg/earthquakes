<script setup lang="ts">
// leaving router in to use later
// import { RouterLink, RouterView } from 'vue-router';
import EarthquakeMap from './components/EarthquakeMap.vue';
import '../node_modules/mapbox-gl/dist/mapbox-gl.css';
</script>

<template>
  <!-- <RouterView /> -->
  <div class="app-container">
    <EarthquakeMap />
  </div>
</template>

<style scoped>
.app-container {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
