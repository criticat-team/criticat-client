<template>
  <div data-cy="view.home">
    <articles-widget />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import ArticlesWidget from '@/components/articles/ArticlesWidget.vue';

export default defineComponent({
  metaInfo() {
    return {
      title: 'Home',
    };
  },
  components: {
    ArticlesWidget,
  },
});
</script>
