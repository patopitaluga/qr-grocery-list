import { createApp, ref, nextTick, } from 'vue';
import { createVuetify, } from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import QRCode from 'qrcode';

// import Login from './components/Login.vue';

const app = createApp({
  /*components: {
    // 'Login': Login,
    // 'v-list-item': VListItem,
    // 'v-list-item-title': VListItemTitle
  },*/
  setup: (/* props */) => {
    const title = ref('');

    const lastUrlPart = window.location.pathname.split('/').pop();

    nextTick()
      .then(() => {
        const qrcodecontainer = document.getElementById('qrcodecontainer');
        QRCode.toCanvas(
          qrcodecontainer,
          window.location.protocol + '//' + window.location.host + '/set/' + lastUrlPart,
          (err) => {
            if (err) console.error(err);
            console.log('success!');
          }
        );
      });

    fetch(`/api/item/${lastUrlPart}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async(_responseRaw) => {
        const responseObject = await _responseRaw.json();
        title.value = responseObject.title;
      });

    return {
      title,
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
