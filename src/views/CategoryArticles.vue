<template>
  <articles-page :category-id="categoryId" />
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import ArticlesPage from '@/components/articles/ArticlesPage.vue';

export default defineComponent({
  props: {
    categoryId: String,
  },
  components: {
    ArticlesPage,
  },
});
</script>
