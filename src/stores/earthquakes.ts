import { ref } from 'vue';
import type { Ref } from 'vue';
import { defineStore } from 'pinia';
import type { EarthquakeFeature } from '@/models/earthquake.model';

export const useEarthquakeStore = defineStore('counter', () => {
  /* in this syntac refs become state properties
    computeds become getters
    functions become actions
  */
  const earthquakes: Ref<EarthquakeFeature[]> = ref([]);

  return { earthquakes };
});
