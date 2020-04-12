import Vue from 'vue';
import Vuex from 'vuex';
import { createDirectStore } from 'direct-vuex';
import categories, { CategoryMap } from '@/config/categories';
import { CategoryId } from '@/config/categories';

Vue.use(Vuex);

type StoreState = {
  currentCategoryId: CategoryId | null;
  categories: CategoryMap;
};

const {
  store,
  rootActionContext,
  moduleActionContext,
  rootGetterContext,
  moduleGetterContext,
} = createDirectStore({
  state: {
    currentCategoryId: null,
    categories,
  } as StoreState,
  getters: {
    currentCategory: (state) =>
      state.currentCategoryId != null ? state.categories[state.currentCategoryId] : null,
  },
  mutations: {
    setCurrentCategoryId(state, id) {
      state.currentCategoryId = id;
    },
  },
  actions: {
    setCurrentCategoryId({ commit }, id) {
      commit('setCurrentCategoryId', id);
    },
  },
});

// Export the direct-store instead of the classic Vuex store.
export default store;

// The following exports will be used to enable types in the
// implementation of actions and getters.
export { rootActionContext, moduleActionContext, rootGetterContext, moduleGetterContext };

// The following lines enable types in the injected store '$store'.
export type AppStore = typeof store;
declare module 'vuex' {
  interface Store<S> {
    direct: AppStore;
  }
}
