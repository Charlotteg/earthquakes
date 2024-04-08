import { ref, computed, type Ref } from 'vue';
import axios from 'axios';
import { defineStore } from 'pinia';
import type { FeatureCollection } from 'geojson';
import { useSearchStore } from './search';
import type { EarthquakeProperties } from '@/models/earthquake.model';

export const useEarthquakeStore = defineStore('earthquakes', () => {
  /* in this syntax refs become state properties
    computeds become getters
    functions become actions
  */
  const earthquakes: Ref<FeatureCollection | null> = ref(null);
  const loading: Ref<boolean> = ref(false);
  const loaded: Ref<boolean> = ref(false);
  const searchStore = useSearchStore();

  const filterFeatures = () => {
    return earthquakes.value?.features.filter(feature => {
      return searchStore.searchTerm !== ''
        ? (feature.properties as EarthquakeProperties).place
            .toLowerCase()
            .includes(searchStore.searchTerm.toLowerCase())
        : true;
    });
  };
  // getters
  const getFilteredGeojson = computed(() => {
    return {
      ...earthquakes.value,
      features: filterFeatures() ?? [],
    };
  });
  // actions
  const loadEarthquakes = async () => {
    loading.value = true;
    try {
      const earthquakeRes = await axios.get(
        `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson`
      );
      earthquakes.value = earthquakeRes.data;
      loading.value = false;
      loaded.value = true;
    } catch (error) {
      console.log('Error loading earthquake data', error);
      loading.value = false;
    }
  };

  return {
    earthquakes,
    loading,
    loaded,
    filterFeatures,
    getFilteredGeojson,
    loadEarthquakes,
  };
});
