<template>
  <section class="articles-page">
    <div class="pa-2 articles-widget__slider__item" v-for="(item, index) in items" :key="index">
      <articles-widget-item :loading="loading" :article="item" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from '@vue/composition-api';
import { CategoryEnum } from '@/config/categories/types';
import ArticlesWidgetItem from './ArticlesWidgetItem.vue';
import { useGetArticlesQuery } from '@/generated/graphql';

export default defineComponent({
  props: {
    categoryId: String as () => CategoryEnum,
  },
  components: {
    ArticlesWidgetItem,
  },
  setup(props) {
    const numberOfItems = 12;

    const articlesCategory = computed(() => props.categoryId || 'all');
    const { result, loading } = useGetArticlesQuery(
      ref({
        category: articlesCategory,
        itemsPerPage: numberOfItems,
      }),
    );

    const items = computed(() =>
      Array.from(Array(10).keys()).map((index) =>
        result.value ? result.value.articles.items[index] : null,
      ),
    );

    return {
      items,
      loading,
      numberOfItems,
    };
  },
});
</script>

<style lang="scss" scoped>
.articles-page {
}
</style>
