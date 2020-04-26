import { CATEGORY__HOME, CATEGORY__ARTICLES } from '@/router/constants';
import CategoryHome from '@/views/CategoryHome.vue';
import CategoryArticles from '@/views/CategoryArticles.vue';
import { CategoryEnum } from '@/config/categories/types';
import { mdiHome, mdiNewspaperVariantMultiple } from '@mdi/js';

export default [
  {
    id: 'home',
    title: 'Home',
    icon: mdiHome,
    categories: [CategoryEnum.books, CategoryEnum.games, CategoryEnum.movies, CategoryEnum.tv],
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
    categories: [CategoryEnum.books, CategoryEnum.games, CategoryEnum.movies, CategoryEnum.tv],
    route: {
      path: 'articles',
      name: CATEGORY__ARTICLES,
      component: CategoryArticles,
    },
  },
];
