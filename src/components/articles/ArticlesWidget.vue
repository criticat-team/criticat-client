<template>
  <section class="py-2">
    <app-slider ref="sliderRef">
      <app-slider-item v-for="(item, index) in items" :key="index">
        <div style="width: 256px; height: 144px;">
          <articles-article-small
            @click="openDialog(index)"
            :article="item.article"
            :loading="item.loading"
          />
        </div>
      </app-slider-item>
    </app-slider>
    <div v-if="categoryArticlesRoute" class="mx-2 d-flex justify-end">
      <v-btn color="primary" x-small text class="overline" :to="categoryArticlesRoute">
        Show more
      </v-btn>
    </div>
    <articles-dialog v-if="!loading" ref="dialogRef" :items="items" />
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, Ref, onMounted } from '@vue/composition-api';
import { Category } from '@/config/categories/types';
import ArticlesArticleSmall from './article/small/ArticlesArticleSmall.vue';
import ArticlesDialog from './ArticlesDialog.vue';
import { useGetArticlesQuery, Article } from '@/generated/graphql';
import { CATEGORY__ARTICLES } from '@/router/constants';
import AppSlider from '@/components/ui/slider/AppSlider.vue';
import AppSliderItem from '@/components/ui/slider/AppSliderItem.vue';

type Item = {
  article: Article;
  loading: boolean;
};

export default defineComponent({
  props: {
    category: Object as () => Category,
  },
  components: {
    ArticlesDialog,
    ArticlesArticleSmall,
    AppSlider,
    AppSliderItem,
  },
  setup(props) {
    const numberOfItems = 16;
    const sliderRef: Ref<InstanceType<typeof AppSlider>> = ref(null);

    onMounted(() => {
      watch(() => props.category, sliderRef.value.resetScroll, {
        lazy: false,
      });
    });

    const articlesCategory = computed(() => (props.category ? props.category.id : 'all'));
    const { result, loading } = useGetArticlesQuery(
      ref({
        category: articlesCategory,
        itemsPerPage: numberOfItems,
      }),
    );

    const items = computed((): Item[] =>
      Array.from(Array(numberOfItems).keys()).map((index) => ({
        article: result.value ? result.value.articles.items[index] : null,
        loading: loading.value,
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

    const dialogRef: Ref<InstanceType<typeof ArticlesDialog>> = ref(null);
    const openDialog = (index: number) => {
      dialogRef.value.openArticle(index);
    };

    return {
      items,
      loading,
      categoryArticlesRoute,
      sliderRef,
      openDialog,
      dialogRef,
    };
  },
});
</script>
