import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { Touch } from 'vuetify/lib/directives';

Vue.use(Vuetify, {
  directives: {
    Touch,
  },
});

export default new Vuetify({
  icons: {
    iconfont: 'mdiSvg',
  },
  theme: {
    options: {
      customProperties: true,
    },
    themes: {},
  },
});
