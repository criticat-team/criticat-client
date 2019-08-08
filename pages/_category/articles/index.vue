<template>
  <div>
    <articles-list :category="category" />
  </div>
</template>

<script>
import ArticlesList from '@/components/articles/ArticlesList';

export default {
  nuxtI18n: {
    paths: {
      ca: '/:category/noticies',
    },
  },
  name: 'CategoryArticles',
  components: {
    ArticlesList,
  },
  asyncData({ store }) {
    return {
      category: store.state.category,
    };
  },
};
</script>
