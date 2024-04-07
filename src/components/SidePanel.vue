<script setup lang="ts">
import type { Ref } from 'vue';
import { ref } from 'vue';
const searchTerm: Ref<string> = ref('');
const search = () => {
  console.log('searching', searchTerm.value);
};
</script>

<template>
  <div class="side-panel">
    <h1>Earthquakes</h1>
    <v-text-field
      append-inner-icon="search"
      density="comfortable"
      label="Search earthquake locations..."
      variant="solo"
      hide-details
      v-model="searchTerm"
      @click:append-inner="search"></v-text-field>
  </div>
</template>

<style>
.side-panel {
  position: absolute;
  left: 0;
  height: 100%;
  width: 400px;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1;
  padding: 1rem;
}
</style>
