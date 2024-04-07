import './assets/main.css';

import { createApp } from 'vue';
// state Management
import { createPinia } from 'pinia';
// Vuetify UI Lib
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { aliases, md } from 'vuetify/iconsets/md';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import App from './App.vue';
import router from './router';

const app = createApp(App);
const vuetify = createVuetify({
  components,
  directives,
  // theme: 'dark', // type issue
  icons: {
    defaultSet: 'md',
    aliases,
    sets: {
      md,
    },
  },
});

app.use(createPinia());
app.use(router);
app.use(vuetify);

app.mount('#app');
