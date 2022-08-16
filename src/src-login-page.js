import { createApp, ref } from 'vue';
import { createVuetify } from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

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
    const name = ref('');
    const password = ref('');
    const errors = ref('');
    const show1 = ref(false);

    /**
     *
     */
    const submit = () => {
      fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          password: password,
        })
      })
        .then(async(_responseRaw) => {
          const responseObject = await _responseRaw.json();
          window.location.replace('/list');
        })
        .catch((_err) => {
          console.log(_err);
        });
    };

    return {
      errors,
      name,
      password,
      show1,
      submit,
    };
  },
});

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    primary: '#7957d5',
  },
})

app.use(vuetify);

app.mount('#app');
