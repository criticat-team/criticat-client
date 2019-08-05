<template>
  <div>
    <articles-list :category="category" />
  </div>
</template>

<script>
import ArticlesList from '@/components/articles/ArticlesList';
import sections from '@/assets/js/sections';

export default {
  meta: {
    compatibility: sections.articles.compatibility,
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
