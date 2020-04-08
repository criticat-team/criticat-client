<template>
  <div>
    <h1>Category Home</h1>
    <articles-widget v-if="category" :category-id="category.id" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import ArticlesWidget from '@/components/articles/ArticlesWidget.vue';
import useCurrentCategory from '@/composables/use-current-category';

export default defineComponent({
  components: {
    ArticlesWidget,
  },
  setup() {
    const { category } = useCurrentCategory();
    return {
      category,
    };
  },
});
</script>
