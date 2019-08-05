/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */

export const state = () => ({
  category: null,
});

export const mutations = {
  setCategory(state, category) {
    state.category = category;
  },
};
