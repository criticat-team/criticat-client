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
import { LogoItemPosition } from './AppLogoItem.vue';
import AppLogoItem from './AppLogoItem.vue';
import store from '@/store';

type Item = {
  color: string;
  position: LogoItemPosition;
};

export default defineComponent({
  components: {
    AppLogoContainer,
    AppLogoItem,
  },
  setup() {
    const categories = computed(() => store.state.categories);
    const items = computed((): Item[] => [
      ...Object.values(categories.value).map((category) => ({
        color: category.color,
        position: category.position as LogoItemPosition,
      })),
      {
        color: '#FFFFFF',
        position: 'center',
      },
    ]);
    return { items };
  },
});
</script>
