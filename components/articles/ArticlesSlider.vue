<template>
  <slider-section :card="card" title="Articles">
    <article-item
      v-for="(n, index) in nDisplayedArticles"
      :key="index"
      compact
      :elevation="itemElevation"
      :article="loadedArticles[index]"
    />
  </slider-section>
</template>

<script>
import ArticleItem from '@/components/articles/ArticleItem';
import SliderSection from '@/components/ui/SliderSection';
import getArticlesGql from '@/gql/getArticles.gql';

export default {
  components: {
    ArticleItem,
    SliderSection,
  },
  props: {
    category: {
      mandatory: false,
      type: String,
      default: null,
    },
  },
  data() {
    return {
      itemsPerPage: 12,
      page: 1,
      isFetchingMore: false,
    };
  },
  computed: {
    card() {
      return this.$vuetify.breakpoint.smAndDown;
    },
    itemElevation() {
      return this.card ? 4 : 2;
    },
    initialLoadHasFinished() {
      return this.articles != null;
    },
    loadedArticles() {
      return this.initialLoadHasFinished ? this.articles.items : [];
    },
    nDisplayedArticles() {
      return this.canFetchMore || !this.initialLoadHasFinished
        ? this.itemsPerPage * this.page
        : this.loadedArticles.length;
    },
    canFetchMore() {
      return this.initialLoadHasFinished && this.articles.continuation != null;
    },
    needsFetch() {
      return (
        !this.isFetchingMore &&
        this.canFetchMore &&
        this.nDisplayedArticles > this.loadedArticles.length
      );
    },
    infiniteScrollDisabled() {
      return !this.canFetchMore;
    },
  },
  apollo: {
    articles: {
      query: getArticlesGql,
      variables() {
        return {
          category: this.category,
          itemsPerPage: this.itemsPerPage,
        };
      },
    },
  },
  watch: {
    needsFetch() {
      if (this.needsFetch) {
        this.fetchMore();
      }
    },
  },
  methods: {
    showMore() {
      this.page += 1;
    },
    fetchMore() {
      this.isFetchingMore = true;
      this.$apollo.queries.articles
        .fetchMore({
          variables: {
            category: this.category,
            itemsPerPage: this.itemsPerPage,
            continuation: this.articles.continuation,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            return {
              articles: {
                // eslint-disable-next-line no-underscore-dangle
                __typename: previousResult.articles.__typename,
                items: [...previousResult.articles.items, ...fetchMoreResult.articles.items],
                continuation: fetchMoreResult.articles.continuation,
              },
            };
          },
        })
        .then(() => (this.isFetchingMore = false));
    },
  },
};
</script>
