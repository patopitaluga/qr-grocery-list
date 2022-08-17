import { createApp, ref, watch } from 'vue';
import { createVuetify } from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// import Login from './components/Login.vue';

const app = createApp({
  /*components: {
    // 'Login': Login,
    // 'v-list-item': VListItem,
    // 'v-list-item-title': VListItemTitle
  },*/
  setup: (/* props */) => {
    const items = ref([]);

    fetch('/api/list', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async(_responseRaw) => {
        items.value = await _responseRaw.json();
      });

    const itemsInStock = () => items.value.filter((_) => _.instock);
    const itemsToBuy = () => items.value.filter((_) => !_.instock);

    const goToDetail = () => alert(123);

    return {
      itemsInStock,
      itemsToBuy,
      goToDetail,
    };
  },
});

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    primary: '#7957d5',
  },
});

app.use(vuetify);

app.mount('#app');
