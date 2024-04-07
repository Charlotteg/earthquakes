import { ref } from 'vue';
import axios from 'axios';
import { defineStore } from 'pinia';

import type { Ref } from 'vue';
import type { FeatureCollection } from 'geojson';

export const useEarthquakeStore = defineStore('earthquakes', () => {
  /* in this syntax refs become state properties
    computeds become getters
    functions become actions
  */
  const earthquakes: Ref<FeatureCollection | null> = ref(null);
  const loading: Ref<boolean> = ref(false);
  const loaded: Ref<boolean> = ref(false);
  const getEarthquakes = async () => {
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

  return { earthquakes, loading, loaded, getEarthquakes };
});
