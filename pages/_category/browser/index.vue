<template>
  <div>
    <h1>Browsing in {{ $t(`categories.${category.id}.name`) }}</h1>
  </div>
</template>

<script>
import pages from '@/assets/js/pages';

export default {
  meta: {
    compatibility: pages.browser.compatibility,
  },
  nuxtI18n: {
    paths: {
      ca: '/:category/navegador',
    },
  },
  data() {
    return {
      category: undefined,
    };
  },
  asyncData({ store }) {
    return {
      category: store.state.category,
    };
  },
};
</script>
