import Vue from 'vue';
import Vuex from 'vuex';
import categories from '@/config/categories';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentCategoryId: null,
    categories,
  },
  getters: {
    currentCategory: (state) =>
      state.currentCategoryId ? state.categories[state.currentCategoryId] : null,
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

export default store;
