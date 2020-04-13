import { CATEGORY__HOME, CATEGORY__ARTICLES } from '@/router/constants';
import CategoryHome from '@/views/CategoryHome.vue';
import CategoryArticles from '@/views/CategoryArticles.vue';
import categories from '@/config/categories';
import { mdiHome, mdiNewspaperVariantMultiple } from '@mdi/js';

export default [
  {
    id: 'home',
    title: 'Home',
    icon: mdiHome,
    categories: [categories.books, categories.games, categories.movies, categories.tv],
    route: {
      path: '',
      name: CATEGORY__HOME,
      component: CategoryHome,
    },
  },
  {
    id: 'articles',
    title: 'Articles',
    icon: mdiNewspaperVariantMultiple,
    categories: [categories.books, categories.games, categories.movies, categories.tv],
    route: {
      path: 'articles',
      name: CATEGORY__ARTICLES,
      component: CategoryArticles,
    },
  },
];
