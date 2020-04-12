<template>
  <app-logo-container>
    <app-logo-item
      v-for="(item, index) in items"
      :key="index"
      :position="item.position"
      :color="item.color"
      active
    />
  </app-logo-container>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';
import AppLogoContainer from './AppLogoContainer.vue';
import AppLogoItem from './AppLogoItem.vue';

export default defineComponent({
  components: {
    AppLogoContainer,
    AppLogoItem,
  },
  setup(props, context) {
    const categories = computed(() => context.root.$store.state.categories);
    const items = computed(() => [
      ...Object.values(categories.value).map((category) => ({
        color: category.color,
        position: category.position,
      })),
      {
        color: 'white',
        position: 'center',
      },
    ]);
    return { items };
  },
});
</script>
