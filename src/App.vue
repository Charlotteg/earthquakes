<script setup lang="ts">
// leaving router in to use later
// import { RouterLink, RouterView } from 'vue-router';
import { onMounted } from 'vue';
import EarthquakeMap from './components/EarthquakeMap.vue';
import SidePanel from './components/SidePanel.vue';
import '../node_modules/mapbox-gl/dist/mapbox-gl.css';
import { useEarthquakeStore } from './stores/earthquakes';
const eqStore = useEarthquakeStore();
onMounted(async () => {
  await eqStore.loadEarthquakes();
});
</script>

<template>
  <!-- <RouterView /> -->
  <div class="app-container">
    <SidePanel />
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
