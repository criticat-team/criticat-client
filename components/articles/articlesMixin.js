import getArticlesGql from '@/gql/getArticles.gql';

const articlesMixin = {
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
    categoryKey() {
      return this.category || 'all';
    },
  },
  apollo: {
    articles: {
      query: getArticlesGql,
      variables() {
        return {
          category: this.categoryKey,
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
            category: this.categoryKey,
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

export default articlesMixin;
