<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import type { Ref } from 'vue';
import { Map } from 'mapbox-gl';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;
const map: Ref<Map | null> = ref(null);
const mapContainer: Ref<HTMLDivElement | null> = ref(null);

onMounted(() => {
  map.value = new mapboxgl.Map({
    container: mapContainer.value ?? '',
    style: 'mapbox://styles/mapbox/streets-v12', // Replace with your preferred map style
    center: [-71.224518, 42.213995],
    zoom: 1.5,
    projection: { name: 'globe' },
  });

  map.value.on('load', () => {
    map.value?.setFog({});
  });
});

onUnmounted(() => {
  map.value?.remove();
  map.value = null;
});
</script>

<template>
  <div ref="mapContainer" class="map-container"></div>
</template>

<style>
.map-container {
  flex: 1;
}
</style>
