import { ref, type Ref } from 'vue';
import { defineStore } from 'pinia';

export const useSearchStore = defineStore('search', () => {
  const searchTerm: Ref<string> = ref('');

  return { searchTerm };
});
