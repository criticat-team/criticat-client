<template>
  <main class="pa-2">
    <v-row no-gutters>
      <v-col v-for="(item, index) in items" :key="index" cols="12" sm="6" md="4" lg="3" xl="2">
        <div class="pa-2">
          <v-responsive :aspect-ratio="16 / 9">
            <articles-article-small
              @click="openDialog(index)"
              :article="item.article"
              :loading="item.loading"
            />
          </v-responsive>
        </div>
      </v-col>
    </v-row>
    <div v-intersect="{ handler: onIntersect, options: intersectOptions }"></div>
    <articles-dialog v-if="!loading" ref="dialogRef" :items="items" />
  </main>
</template>

<script lang="ts">
import { defineComponent, computed, ref, Ref, watch } from '@vue/composition-api';
import { CategoryEnum } from '@/config/categories/types';
import ArticlesArticleSmall from './article/small/ArticlesArticleSmall.vue';
import { useGetArticlesQuery, Article } from '@/generated/graphql';
import ArticlesDialog from './ArticlesDialog.vue';

const ITEMS_PER_PAGE = 64;
type Item = {
  article: Article;
  loading: boolean;
};

export default defineComponent({
  props: {
    categoryId: String as () => CategoryEnum,
  },
  components: {
    ArticlesArticleSmall,
    ArticlesDialog,
  },
  setup(props) {
    const numberOfPages = ref(1);
    const numberOfItems = computed(() => numberOfPages.value * ITEMS_PER_PAGE);

    // Infinite scroll
    const needsMorePages = ref(null);
    const intersectOptions = { rootMargin: '800px' };
    const onIntersect = (entries, observer, isIntersecting) => {
      needsMorePages.value = isIntersecting;
    };

    const loadPagesUntilCovered = () => {
      if (needsMorePages.value) {
        numberOfPages.value++;
        setTimeout(() => {
          loadPagesUntilCovered();
        });
      }
    };

    watch(needsMorePages, loadPagesUntilCovered, { lazy: true });

    // Query
    const articlesCategory = computed(() => props.categoryId || 'all');
    const { result, loading, fetchMore } = useGetArticlesQuery(
      ref({
        category: articlesCategory,
        itemsPerPage: numberOfItems.value,
      }),
      {
        notifyOnNetworkStatusChange: true,
      },
    );

    const items = computed((): Item[] =>
      Array.from(Array(numberOfItems.value).keys()).map((index) => ({
        article: result.value ? result.value.articles.items[index] : null,
        loading: result.value ? result.value.articles.items[index] == null : true,
      })),
    );

    // Pagination
    const fetchMoreArticles = () => {
      fetchMore({
        variables: {
          continuation: result.value.articles.continuation,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => ({
          articles: {
            __typename: previousResult.articles.__typename,
            items: [...previousResult.articles.items, ...fetchMoreResult.articles.items],
            continuation: fetchMoreResult.articles.continuation,
          },
        }),
      });
    };

    const loadedArticles = computed(() => (result.value ? result.value.articles.items.length : 0));
    const missingArticles = computed(() => numberOfItems.value - loadedArticles.value);

    watch(missingArticles, (n) => {
      if (n > 0 && !loading.value && result.value.articles.continuation != null) {
        fetchMoreArticles();
      }
    });

    // Dialog
    const dialogRef: Ref<InstanceType<typeof ArticlesDialog>> = ref(null);
    const openDialog = (index: number) => {
      dialogRef.value.openArticle(index);
    };

    return {
      items,
      loading,
      openDialog,
      dialogRef,
      onIntersect,
      intersectOptions,
    };
  },
});
</script>
