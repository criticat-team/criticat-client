import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@/views/Home.vue';
import Category from '@/views/Category.vue';
import CategoryHome from '@/views/CategoryHome.vue';
import CategoryArticles from '@/views/CategoryArticles.vue';
import { HOME, CATEGORY__HOME, CATEGORY__ARTICLES } from './constants';
import categories from '@/config/categories';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/',
    name: HOME,
    component: Home,
  },
  {
    path: '/:categoryId',
    component: Category,
    props: true,
    beforeEnter(to, from, next) {
      if (categories[to.params.categoryId] == null) {
        next({ name: HOME });
      } else {
        next();
      }
    },
    children: [
      {
        path: '',
        name: CATEGORY__HOME,
        component: CategoryHome,
      },
      {
        path: 'articles',
        name: CATEGORY__ARTICLES,
        component: CategoryArticles,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
