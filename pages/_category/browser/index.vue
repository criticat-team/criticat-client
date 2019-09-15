<template>
  <div>
    <h1>Browsing in {{ $t(`categories.${category.id}.name`) }}</h1>
  </div>
</template>

<script>
export default {
  nuxtI18n: {
    paths: {
      ca: '/:category/explora',
    },
  },
  name: 'CategoryBrowser',
  asyncData({ store }) {
    return {
      category: store.state.category,
    };
  },
};
</script>
