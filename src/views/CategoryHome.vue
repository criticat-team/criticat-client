<template>
  <div class="my-2">
    <articles-widget :category-id="currentCategoryId" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';
import ArticlesWidget from '@/components/articles/ArticlesWidget.vue';

export default defineComponent({
  components: {
    ArticlesWidget,
  },
  setup(props, context) {
    const currentCategoryId = computed(() => context.root.$store.state.currentCategoryId);
    return {
      currentCategoryId,
    };
  },
});
</script>
