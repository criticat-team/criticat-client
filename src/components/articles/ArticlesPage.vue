<template>
  <h1>Articles page</h1>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import { CategoryId } from '@/config/categories';

export default defineComponent({
  props: {
    categoryId: String as () => CategoryId,
  },
});
</script>

<style></style>
