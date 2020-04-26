import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import './plugins/vue-screen';
import './plugins/composition-api';
import './plugins/vue-meta';
import { apolloClient } from './plugins/vue-apollo';
import { provide } from '@vue/composition-api';
import { DefaultApolloClient } from '@vue/apollo-composable';

Vue.config.productionTip = false;

new Vue({
  setup() {
    provide(DefaultApolloClient, apolloClient);
    return {};
  },
  router,
  store: store.original,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
