<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
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
const { earthquakes, getFilteredGeojson, loaded, getSelectedCoords, hoverId } =
  storeToRefs(eqStore);
const searchStore = useSearchStore();

// different ways of responding to changes in the store
watch(loaded, () => {
  addEarthquakesLayer();
});
watch(getSelectedCoords, coords => {
  if (coords && map.value) {
    map.value.flyTo({ center: coords, zoom: 5 });
  }
});

watch(hoverId, () => {
  if (map.value) {
    const filter = ['==', hoverId.value, ['get', 'code']];
    map.value.setFilter('highlight-layer', filter);
    map.value.setFilter('highlight-layer-1', filter);
    map.value.setFilter('highlight-layer-2', filter);
  }
});

searchStore.$subscribe(() =>
  updateSource('earthquakes', getFilteredGeojson.value as FeatureCollection)
);

const updateSource = (identifier: string, data: FeatureCollection) => {
  if (getFilteredGeojson.value) {
    (map.value?.getSource(identifier) as GeoJSONSource)?.setData(data);
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
    // add multiple layers to create glowy effect
    map.value?.addLayer({
      id: 'earthquakes-layer-1',
      type: 'circle',
      source: 'earthquakes',
      paint: {
        'circle-radius': ['*', 5, ['get', 'mag']],
        'circle-blur': 2,
        'circle-color': '#c73a30',
      },
    });
    map.value?.addLayer({
      id: 'earthquakes-layer-2',
      type: 'circle',
      source: 'earthquakes',
      paint: {
        'circle-radius': ['*', 3, ['get', 'mag']],
        'circle-color': '#f53e31',
        'circle-blur': 2,
      },
    });
    map.value?.addLayer({
      id: 'earthquakes-layer-3',
      type: 'circle',
      source: 'earthquakes',
      paint: {
        'circle-radius': ['*', 0.7, ['get', 'mag']],
        'circle-color': '#f5ad31',
      },
    });

    // add highlight layers
    map.value?.addLayer({
      id: 'highlight-layer-1',
      type: 'circle',
      source: 'earthquakes',
      paint: {
        'circle-radius': ['*', 5, ['get', 'mag']],
        'circle-blur': 2,
        'circle-color': 'blue',
      },
    });
    map.value?.addLayer({
      id: 'highlight-layer-2',
      type: 'circle',
      source: 'earthquakes',
      paint: {
        'circle-radius': ['*', 3, ['get', 'mag']],
        'circle-color': 'blue',
        'circle-blur': 2,
      },
    });
    map.value?.addLayer({
      id: 'highlight-layer',
      type: 'circle',
      source: 'earthquakes',
      filter: ['==', '', ['get', 'code']],
      paint: {
        'circle-radius': ['*', 1.2, ['get', 'mag']],
        'circle-color': '#f5ad31',
      },
    });
  }
};

onMounted(() => {
  map.value = new mapboxgl.Map({
    container: mapContainer.value ?? '',
    style: 'mapbox://styles/mapbox/navigation-night-v1',
    center: [-71.224518, 42.213995],
    zoom: 1.5,
    projection: { name: 'globe' },
  });

  map.value.on('style.load', () => {
    map.value?.setFog({
      color: '#82221b',
      'horizon-blend': 0.1,
      'space-color': '#000000',
    });
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
