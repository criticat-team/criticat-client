<template>
  <div
    v-infinite-scroll="showMore"
    infinite-scroll-disabled="infiniteScrollDisabled"
    infinite-scroll-distance="800"
  >
    <v-layout row wrap>
      <v-flex v-for="(n, index) in nDisplayedArticles" :key="index" xs12 sm12 lg6 xl4>
        <article-item :article="loadedArticles[index]" />
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import articlesMixin from '@/components/articles/articlesMixin';
import ArticleItem from '@/components/articles/ArticleItem';

export default {
  components: {
    ArticleItem,
  },
  mixins: [articlesMixin],
  computed: {
    infiniteScrollDisabled() {
      return !this.canFetchMore;
    },
  },
};
</script>
