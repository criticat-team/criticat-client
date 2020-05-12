<template>
  <v-list class="pa-0">
    <v-list-item
      color="primary"
      class="my-3"
      v-for="(section, index) in sections"
      :key="index"
      :to="{ name: section.route.name, params: { categoryId: currentCategory.id } }"
      exact
    >
      <v-list-item-icon>
        <v-icon>{{ section.icon }}</v-icon>
      </v-list-item-icon>
      <v-list-item-title>
        {{ section.title }}
      </v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';
import store from '@/store';

export default defineComponent({
  setup() {
    const currentCategory = computed(() => store.getters.currentCategory);
    const sections = computed(() => store.getters.currentCategorySections);

    return {
      currentCategory,
      sections,
    };
  },
});
</script>
