<template>
  <div data-cy="view.home" class="my-2">
    <articles-widget />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import ArticlesWidget from '@/components/articles/ArticlesWidget.vue';

export default defineComponent({
  components: {
    ArticlesWidget,
  },
});
</script>
