import Vue from 'vue';
import Vuex from 'vuex';
import { createDirectStore } from 'direct-vuex';
import categories from '@/config/categories';
import { CategoryMap, Category, CategoryEnum } from '@/config/categories/types';
import sections from '@/config/sections';

Vue.use(Vuex);

type StoreState = {
  currentCategoryId: CategoryEnum | null;
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
    currentCategorySections: (state, getters) =>
      getters.currentCategory != null ? getters.getSectionsByCategory(getters.currentCategory) : [],
    getSectionsByCategory: () => (category: Category) =>
      sections.filter((section) => section.categories.includes(category.id)),
  },
  mutations: {
    setCurrentCategoryId(state, id) {
      state.currentCategoryId = id;
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
