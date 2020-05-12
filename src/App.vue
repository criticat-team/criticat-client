<template>
  <component :is="layout" />
</template>

<script lang="ts">
import { defineComponent, watch, computed } from '@vue/composition-api';
import DesktopLayout from '@/layouts/DesktopLayout.vue';
import MobileLayout from '@/layouts/MobileLayout.vue';
import store from '@/store';

export default defineComponent({
  name: 'App',
  metaInfo() {
    return {
      titleTemplate: '%s | Criticat',
      meta: [
        {
          hid: 'theme-color',
          name: 'theme-color',
          content: this.primaryColor,
        },
      ],
    };
  },
  setup(props, context) {
    const layout = computed(() =>
      context.root.$vuetify.breakpoint.mdAndUp ? DesktopLayout : MobileLayout,
    );

    // Set category from url
    const currentCategoryId = computed(() => context.root.$route.params.categoryId);
    watch(currentCategoryId, (currentCategoryId) => {
      store.commit.setCurrentCategoryId(currentCategoryId);
    });

    // Set primary color from category
    const currentCategory = computed(() => store.getters.currentCategory);
    const primaryColor = computed(() =>
      currentCategory.value ? currentCategory.value.color : '#333333',
    );

    watch(primaryColor, (primaryColor) => {
      context.root.$vuetify.theme.currentTheme.primary = primaryColor;
    });

    return {
      layout,
      primaryColor,
    };
  },
});
</script>
