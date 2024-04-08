<script setup lang="ts">
import EarthquakeDataCard from '@/components/EarthquakeDataCard.vue';
import { useEarthquakeStore } from '@/stores/earthquakes';
import { storeToRefs } from 'pinia';
import type { EarthquakeProperties } from '@/models/earthquake.model';
import { useSearchStore } from '@/stores/search';
const eqStore = useEarthquakeStore();
const { getFilteredGeojson, selectedId } = storeToRefs(eqStore);
const searchStore = useSearchStore();
const { searchTerm } = storeToRefs(searchStore);
</script>

<template>
  <div class="side-panel">
    <div class="side-panel__header">
      <h1>Earthquakes</h1>
      <v-text-field
        class="search"
        append-inner-icon="search"
        density="comfortable"
        label="Search earthquake locations..."
        variant="solo"
        hide-details
        v-model="searchTerm"></v-text-field>
    </div>
    <div class="earthquake-list">
      <div
        class="earthquake-list__item"
        v-for="earthquake of getFilteredGeojson.features"
        :key="earthquake.id">
        <EarthquakeDataCard
          :id="`${earthquake.id}` ?? ''"
          :earthquake="earthquake.properties as EarthquakeProperties"
          @selected="id => (selectedId = id)" />
      </div>
    </div>
  </div>
</template>

<style>
.side-panel {
  position: absolute;
  left: 0;
  height: 100vh;
  width: 400px;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1;
  padding: 1rem 0;
}

.side-panel__header {
  margin: 0 1rem;
}

.search {
  margin: 1rem 1rem 1.5rem 0;
}

.earthquake-list {
  height: 80vh;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #bebebe rgba(0, 0, 0, 0);
}

.earthquake-list__item {
  margin: 0 1rem;
}
</style>
