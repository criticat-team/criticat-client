<template>
  <div data-cy="view.category-articles">
    <articles-grid :category-id="currentCategory.id" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';
import ArticlesGrid from '@/components/articles/ArticlesGrid.vue';
import store from '@/store';

export default defineComponent({
  metaInfo() {
    return {
      title: `${this.currentCategory.id} articles`,
    };
  },
  components: {
    ArticlesGrid,
  },
  setup() {
    const currentCategory = computed(() => store.getters.currentCategory);
    return {
      currentCategory,
    };
  },
});
</script>
