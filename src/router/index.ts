import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@/views/Home.vue';
import Category from '@/views/Category.vue';
import { HOME, CATEGORY__HOME } from './constants';
import { CategoryTypesEnum } from '@/config/categories';
import sections from '@/config/sections';

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
    children: sections.map((section) => ({
      ...section.route,
      beforeEnter(to, from, next) {
        if (section.categories.map((category) => category.id).includes(to.params.categoryId)) {
          next();
        } else {
          next({ name: CATEGORY__HOME, params: { categoryId: to.params.categoryId } });
        }
      },
    })),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
