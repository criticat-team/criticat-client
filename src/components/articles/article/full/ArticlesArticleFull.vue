<template>
  <v-card tile dark class="d-flex flex-column fill-height">
    <articles-article-full-skeleton v-if="loading" />
    <articles-article-full-content v-else :article="article" />
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import ArticlesArticleFullContent from './ArticlesArticleFullContent.vue';
import ArticlesArticleFullSkeleton from './ArticlesArticleFullSkeleton.vue';
import { Article } from '@/generated/graphql';

export default defineComponent({
  components: {
    ArticlesArticleFullContent,
    ArticlesArticleFullSkeleton,
  },
  props: {
    loading: Boolean,
    article: Object as () => Article | null,
  },
});
</script>
