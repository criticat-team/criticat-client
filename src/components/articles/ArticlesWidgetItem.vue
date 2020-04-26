<template>
  <v-skeleton-loader :width="width" :height="height" type="image" :loading="loading || !article">
    <articles-widget-item-article :style="articleStyle" :article="article" />
  </v-skeleton-loader>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import ArticlesWidgetItemArticle from './ArticlesWidgetItemArticle.vue';
import { Article } from '@/generated/graphql';

export default defineComponent({
  components: {
    ArticlesWidgetItemArticle,
  },
  props: {
    loading: Boolean,
    article: Object as () => Article | null,
  },
  setup() {
    const WIDTH = '256px';
    const HEIGHT = '144px';
    const articleStyle = {
      width: WIDTH,
      height: HEIGHT,
    };

    return {
      width: WIDTH,
      height: HEIGHT,
      articleStyle,
    };
  },
});
</script>
