<template>
  <div>
    <articles-list :category="category" />
  </div>
</template>

<script>
import ArticlesList from '@/components/articles/ArticlesList';
import pages from '@/assets/js/pages';

export default {
  meta: {
    compatibility: pages.articles.compatibility,
  },
  nuxtI18n: {
    paths: {
      ca: '/:category/noticies',
    },
  },
  components: {
    ArticlesList,
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
