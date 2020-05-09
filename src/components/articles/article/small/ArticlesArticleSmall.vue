<template>
  <article class="fill-height">
    <articles-article-small-skeleton v-if="loading" type="image" />
    <articles-article-small-content v-else @click="$emit('click', $event)" :article="article" />
  </article>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import ArticlesArticleSmallContent from './ArticlesArticleSmallContent.vue';
import ArticlesArticleSmallSkeleton from './ArticlesArticleSmallSkeleton.vue';
import { Article } from '@/generated/graphql';

export default defineComponent({
  components: {
    ArticlesArticleSmallContent,
    ArticlesArticleSmallSkeleton,
  },
  props: {
    loading: Boolean,
    article: Object as () => Article | null,
  },
});
</script>
