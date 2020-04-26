<template>
  <div data-cy="view.category-articles" class="my-2">
    <articles-page :category-id="currentCategory.id" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';
import ArticlesPage from '@/components/articles/ArticlesPage.vue';
import store from '@/store';

export default defineComponent({
  components: {
    ArticlesPage,
  },
  setup() {
    const currentCategory = computed(() => store.getters.currentCategory);
    return {
      currentCategory,
    };
  },
});
</script>
