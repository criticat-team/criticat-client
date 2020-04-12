<template>
  <section class="articles-widget">
    <div class="articles-widget__slider d-flex overflow-x-auto hide-scrollbar">
      <div class="pa-2 articles-widget__slider__item" v-for="(item, index) in items" :key="index">
        <articles-widget-item :item="item" />
      </div>
    </div>
    <div class="mx-3 d-flex justify-end align-end">
      <a class="overline" :to="{}">Show more</a>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from '@vue/composition-api';
import { CategoryId } from '@/config/categories';
import ArticlesWidgetItem from './ArticlesWidgetItem.vue';
import { useGetArticlesQuery } from '@/generated/graphql';

export default defineComponent({
  props: {
    categoryId: String as () => CategoryId,
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
      Array.from(Array(10).keys()).map((index) => ({
        loading: loading.value,
        article: result.value ? result.value.articles.items[index] : null,
      })),
    );

    return {
      items,
      numberOfItems,
    };
  },
});
</script>

<style lang="scss" scoped>
.articles-widget {
  &__slider {
    &::-webkit-scrollbar {
      display: none;
    }
    &__item {
      &:first-child {
        padding-left: 16px !important;
      }
      &:last-child {
        padding-right: 16px !important;
      }
    }
  }
}
</style>
