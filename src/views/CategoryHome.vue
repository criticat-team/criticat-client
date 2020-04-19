<template>
  <div data-cy="view.category-home" class="my-2">
    <articles-widget :category="currentCategory" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';
import ArticlesWidget from '@/components/articles/ArticlesWidget.vue';
import store from '@/store';

export default defineComponent({
  metaInfo() {
    return {
      title: this.currentCategory ? this.currentCategory.id : undefined,
    };
  },
  components: {
    ArticlesWidget,
  },
  setup() {
    const currentCategory = computed(() => store.getters.currentCategory);
    return {
      currentCategory,
    };
  },
});
</script>
