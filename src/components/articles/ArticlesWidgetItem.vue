<template>
  <v-skeleton-loader
    :width="width"
    :height="height"
    type="image"
    :loading="item.loading"
    transition="fade-transition"
  >
    <articles-widget-item-article :style="articleStyle" :article="item.article" />
  </v-skeleton-loader>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import ArticlesWidgetItemArticle from './ArticlesWidgetItemArticle.vue';

export default defineComponent({
  components: {
    ArticlesWidgetItemArticle,
  },
  props: {
    item: Object,
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
