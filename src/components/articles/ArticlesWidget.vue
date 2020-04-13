<template>
  <section class="articles-widget">
    <div class="articles-widget__slider d-flex overflow-x-auto hide-scrollbar">
      <div class="pa-2 articles-widget__slider__item" v-for="(item, index) in items" :key="index">
        <articles-widget-item :item="item" />
      </div>
    </div>
    <div v-if="categoryArticlesRoute" class="mx-2 d-flex justify-end">
      <v-btn color="primary" x-small text class="overline" :to="categoryArticlesRoute">
        Show more
      </v-btn>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from '@vue/composition-api';
import { Category } from '@/config/categories';
import ArticlesWidgetItem from './ArticlesWidgetItem.vue';
import { useGetArticlesQuery } from '@/generated/graphql';
import { CATEGORY__ARTICLES } from '@/router/constants';

export default defineComponent({
  props: {
    category: Object as () => Category,
  },
  components: {
    ArticlesWidgetItem,
  },
  setup(props) {
    const numberOfItems = 12;

    const articlesCategory = computed(() => (props.category ? props.category.id : 'all'));
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

    const categoryArticlesRoute = computed(() =>
      props.category
        ? {
            name: CATEGORY__ARTICLES,
            params: {
              categoryId: props.category.id,
            },
          }
        : null,
    );

    return {
      items,
      numberOfItems,
      categoryArticlesRoute,
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
