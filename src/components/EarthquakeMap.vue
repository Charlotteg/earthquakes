<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import type { Ref } from 'vue';
import { Map, type GeoJSONSource } from 'mapbox-gl';
import mapboxgl from 'mapbox-gl';
import { useEarthquakeStore } from '@/stores/earthquakes';
import { storeToRefs } from 'pinia';
import type { FeatureCollection } from 'geojson';
import { useSearchStore } from '@/stores/search';

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;
const map: Ref<Map | null> = ref(null);
const mapContainer: Ref<HTMLDivElement | null> = ref(null);
const eqStore = useEarthquakeStore();
const { earthquakes, getFilteredGeojson } = storeToRefs(eqStore);
const searchStore = useSearchStore();

eqStore.$subscribe(() => addEarthquakesLayer());
searchStore.$subscribe(() => updateSource());

const updateSource = () => {
  if (getFilteredGeojson.value) {
    (map.value?.getSource('earthquakes') as GeoJSONSource).setData(
      getFilteredGeojson.value as FeatureCollection
    );
  }
};

const addEarthquakesLayer = () => {
  if (
    map.value &&
    earthquakes.value &&
    map.value.loaded() &&
    !map.value.getLayer('earthquakes-layer')
  ) {
    map.value?.addSource('earthquakes', {
      type: 'geojson',
      data: earthquakes.value as FeatureCollection,
    });
    map.value?.addLayer({
      id: 'earthquakes-layer',
      type: 'circle',
      source: 'earthquakes',
      paint: {
        'circle-radius': 4,
        'circle-stroke-width': 2,
        'circle-color': 'red',
        'circle-stroke-color': 'white',
      },
    });
  }
};

onMounted(() => {
  map.value = new mapboxgl.Map({
    container: mapContainer.value ?? '',
    style: 'mapbox://styles/mapbox/streets-v12', // Replace with your preferred map style
    center: [-71.224518, 42.213995],
    zoom: 1.5,
    projection: { name: 'globe' },
  });

  map.value.on('style.load', () => {
    map.value?.setFog({});
  });

  map.value.on('load', () => {
    addEarthquakesLayer();
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
