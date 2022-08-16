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
  setup: function(/* props */) {
    const items = ref([
      {
        title: 'Azucar',
        description: 'Azucar Ledezma 1kg',
        value: 1,
        instock: true,
      },
      {
        title: 'Mayonesa',
        description: 'Hellmans 300g',
        value: 2,
        instock: true,
      },
      {
        title: 'Shampoo',
        description: 'Head and shoulders para cabellos grasos',
        value: 3,
        instock: true,
      },
    ]);

    const itemsInStock = () => items.value.filter((_) => _.instock);
    const itemsToBuy = () => items.value.filter((_) => !_.instock);

    const goToDetail = () => alert(123);

    return {
      items,
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
