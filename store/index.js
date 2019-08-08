/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
import categories from '@/assets/js/categories';
import pages from '@/assets/js/pages';

export const state = () => ({
  category: null,
});

export const mutations = {
  setCategory(state, category) {
    state.category = category;
  },
};

export const getters = {
  categories: state =>
    Object.values(categories).map(category => {
      const { slug, name } = state.i18n.messages.categories[category.id];
      return {
        ...category,
        slug,
        name,
      };
    }),
  pages: state =>
    Object.values(pages).map(page => {
      const { slug, name } = state.i18n.messages.pages[page.id];
      return {
        ...page,
        slug,
        name,
      };
    }),
  getCategoryById: (state, getters) => id =>
    getters.categories.find(category => category.id === id),
  getCategoryBySlug: (state, getters) => slug =>
    getters.categories.find(category => category.slug === slug),
  getPageBySlug: (state, getters) => slug => getters.pages.find(page => page.slug === slug),
  compatiblePages: (state, getters) =>
    state.category !== null
      ? getters.pages.filter(page => page.compatibility.includes(state.category.id))
      : [],
};
