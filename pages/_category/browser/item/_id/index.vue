<template>
  <div>
    <div v-if="item">
      <h1>{{ item.title }}</h1>
    </div>
  </div>
</template>

<script>
import itemQueries from '@/gql/browser/item/';

export default {
  nuxtI18n: {
    paths: {
      ca: '/:category/explora/fitxa/:id',
    },
  },
  name: 'CategoryBrowserItem',
  computed: {
    id() {
      return this.$route.params.id;
    },
    key() {
      return this.category.itemKey;
    },
  },
  asyncData({ store }) {
    return {
      category: store.state.category,
    };
  },
  apollo: {
    item: {
      query() {
        return itemQueries[this.key];
      },
      variables() {
        return {
          id: this.id,
          language: this.$i18n.locale,
        };
      },
      update(data) {
        return data[this.key];
      },
    },
  },
};
</script>
