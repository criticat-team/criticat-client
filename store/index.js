/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import categories from '@/assets/js/categories';

export const state = () => ({
  category: null,
});

export const mutations = {
  setCategory(state, categoryId) {
    state.category = categories[categoryId];
  },
};
