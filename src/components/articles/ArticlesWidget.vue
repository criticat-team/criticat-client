<template>
  <div>
    <h2>Articles Widget</h2>
    <div v-if="result" class="d-flex overflow-x-auto">
      <div class="pa-3" v-for="article in result.articles.items" :key="article.id">
        <articles-widget-item :article="article" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';
import { CategoryId } from '@/config/categories/index.d';
import { useQuery } from '@vue/apollo-composable';
import gql from 'graphql-tag';
import ArticlesWidgetItem from './ArticlesWidgetItem.vue';

export default defineComponent({
  props: {
    categoryId: String as () => CategoryId,
  },
  components: {
    ArticlesWidgetItem,
  },
  setup(props) {
    const articlesCategory = computed(() => props.categoryId || 'all');
    const { result, loading } = useQuery(
      gql`
        query getArticles($category: String!, $itemsPerPage: Int, $continuation: String) {
          articles(category: $category, itemsPerPage: $itemsPerPage, continuation: $continuation) {
            items {
              id
              title
              image
            }
            continuation
          }
        }
      `,
      {
        category: articlesCategory,
      },
    );
    return {
      result,
      loading,
    };
  },
});
</script>

<style></style>
