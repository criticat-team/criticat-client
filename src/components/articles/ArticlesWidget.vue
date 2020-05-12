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
    <app-dialog-slider v-if="showDialog" v-model="dialogVisibleItem" @close="closeDialog">
      <app-dialog-slider-item v-for="(item, index) in items" :key="index">
        <articles-article-full :article="item.article" :loading="item.loading" />
      </app-dialog-slider-item>
      <app-dialog-slider-item v-if="categoryArticlesRoute">
        <v-card dark class="d-flex fill-height align-center justify-center">
          <v-btn color="primary" :to="categoryArticlesRoute">
            Show more
          </v-btn>
        </v-card>
      </app-dialog-slider-item>
    </app-dialog-slider>
  </section>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, Ref, onMounted } from '@vue/composition-api';
import { Category } from '@/config/categories/types';
import ArticlesArticleSmall from './article/small/ArticlesArticleSmall.vue';
import ArticlesArticleFull from './article/full/ArticlesArticleFull.vue';
import AppDialogSlider from '@/components/ui/dialog-slider/AppDialogSlider.vue';
import AppDialogSliderItem from '@/components/ui/dialog-slider/AppDialogSliderItem.vue';
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
    AppDialogSlider,
    AppDialogSliderItem,
    ArticlesArticleSmall,
    ArticlesArticleFull,
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

    // Dialog
    const dialogVisibleItem: Ref<number> = ref(null);
    const showDialog: Ref<boolean> = ref(false);
    const openDialog = (index) => {
      showDialog.value = true;
      dialogVisibleItem.value = index;
    };
    const closeDialog = () => {
      showDialog.value = false;
      dialogVisibleItem.value = null;
    };

    return {
      items,
      loading,
      categoryArticlesRoute,
      sliderRef,
      openDialog,
      closeDialog,
      showDialog,
      dialogVisibleItem,
    };
  },
});
</script>
