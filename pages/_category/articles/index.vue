<template>
  <div>
    <articles-list :category="category" />
  </div>
</template>

<script>
import ArticlesList from '@/components/articles/ArticlesList';

export default {
  components: {
    ArticlesList,
  },
  data() {
    return {
      category: undefined,
    };
  },
  asyncData({ params }) {
    return {
      category: params.category,
    };
  },
};
</script>
