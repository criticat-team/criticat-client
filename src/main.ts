import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import './plugins/composition-api';
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
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
