<template>
  <section class="articles-widget">
    <app-slider>
      <app-slider-item v-for="(item, index) in items" :key="index">
        <articles-widget-item :article="item" :loading="loading" />
      </app-slider-item>
    </app-slider>
    <div v-if="categoryArticlesRoute" class="mx-2 d-flex justify-end">
      <v-btn color="primary" x-small text class="overline" :to="categoryArticlesRoute">
        Show more
      </v-btn>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from '@vue/composition-api';
import { Category } from '@/config/categories/types';
import ArticlesWidgetItem from './ArticlesWidgetItem.vue';
import { useGetArticlesQuery, Article } from '@/generated/graphql';
import { CATEGORY__ARTICLES } from '@/router/constants';
import AppSlider from '@/components/ui/slider/AppSlider.vue';
import AppSliderItem from '@/components/ui/slider/AppSliderItem.vue';

export default defineComponent({
  props: {
    category: Object as () => Category,
  },
  components: {
    ArticlesWidgetItem,
    AppSlider,
    AppSliderItem,
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

    const items = computed((): Article[] =>
      Array.from(Array(numberOfItems).keys()).map((index) =>
        result.value ? result.value.articles.items[index] : null,
      ),
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
      loading,
      numberOfItems,
      categoryArticlesRoute,
    };
  },
});
</script>
