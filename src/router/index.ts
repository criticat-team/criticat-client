import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@/views/Home.vue';
import Category from '@/views/Category.vue';
import CategoryHome from '@/views/CategoryHome.vue';
import { HOME, CATEGORY__HOME } from './constants';
import { CategoryTypesEnum } from '@/config/categories';

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
      if (to.params.categoryId in CategoryTypesEnum) {
        next();
      } else {
        next({ name: HOME });
      }
    },
    children: [
      {
        path: '',
        name: CATEGORY__HOME,
        component: CategoryHome,
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
