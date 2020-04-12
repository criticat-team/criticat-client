<template>
  <div class="my-2">
    <articles-widget :category-id="currentCategoryId" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';
import ArticlesWidget from '@/components/articles/ArticlesWidget.vue';
import store from '@/store';

export default defineComponent({
  components: {
    ArticlesWidget,
  },
  setup() {
    const currentCategoryId = computed(() => store.state.currentCategoryId);
    return {
      currentCategoryId,
    };
  },
});
</script>
