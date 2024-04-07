<script setup lang="ts"></script>

<template>
  <v-card class="mx-auto eq-card" hover>
    <div class="eq-card__circle"></div>
    <div>
      <v-card-title class="eq-card__title">Maug Islands region, </v-card-title>
      <v-card-subtitle class="eq-card__subtitle"
        >Northern Mariana Islands
      </v-card-subtitle>
      <v-card-text class="eq-card__details">
        <span class="eq-card__details--mag">7.2</span>
        <span>05 March 13:24</span>
      </v-card-text>
    </div>
    <v-btn class="eq-card__button">
      View
      <template v-slot:append>
        <v-icon>arrow_forward</v-icon>
      </template></v-btn
    >
  </v-card>
</template>

<style>
.eq-card {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  display: grid;
  grid-template-columns: 1fr 3fr 2fr;
  align-items: center;
  box-shadow:
    0px 2px 1px -1px var(--v-shadow-key-umbra-opacity, rgba(255, 255, 255, 0.2)),
    0px 1px 1px 0px
      var(--v-shadow-key-penumbra-opacity, rgba(255, 255, 255, 0.14)),
    0px 1px 3px 0px
      var(--v-shadow-key-ambient-opacity, rgba(255, 255, 255, 0.12));
}
.eq-card:hover {
  box-shadow:
    0px 5px 5px -3px var(--v-shadow-key-umbra-opacity, rgba(255, 255, 255, 0.2)),
    0px 8px 10px 1px
      var(--v-shadow-key-penumbra-opacity, rgba(255, 255, 255, 0.14)),
    0px 3px 14px 2px
      var(--v-shadow-key-ambient-opacity, rgba(255, 255, 255, 0.12));
}
.eq-card__circle {
  border-radius: 50%;
  width: 24px;
  height: 24px;
  background-color: #ffd600;
  margin-left: 1rem;
}

.eq-card__title {
  padding-bottom: 0;
}

.eq-card__subtitle {
  opacity: 1;
}

.eq-card__details {
  display: flex;
  justify-content: space-between;
}

.eq-card__details--mag {
  color: #ffd600;
  font-weight: bold;
  font-size: 1rem;
}

.eq-card__button {
  background-color: black;
  color: white;
}
</style>
