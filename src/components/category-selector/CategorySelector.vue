<template>
  <app-logo-container>
    <router-link v-for="(item, index) in items" :key="index" :to="item.route">
      <app-logo-item :active="item.active" :color="item.color" :position="item.position" />
    </router-link>
  </app-logo-container>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';
import AppLogoContainer from '@/components/logo/AppLogoContainer.vue';
import AppLogoItem from '@/components/logo/AppLogoItem.vue';
import { LogoItemPosition } from '@/components/logo/AppLogoItem.vue';
import store from '@/store';
import { Location } from 'vue-router';

type Item = {
  route: Location;
  color: string;
  position: LogoItemPosition;
  active: boolean;
};

export default defineComponent({
  components: {
    AppLogoContainer,
    AppLogoItem,
  },
  setup() {
    const currentCategory = computed(() => store.getters.currentCategory);
    const categories = computed(() => store.state.categories);
    const items = computed((): Item[] => [
      ...Object.values(categories.value).map((category) => ({
        route: { name: 'category.home', params: { categoryId: category.id } },
        color: category.color,
        position: category.position,
        active: currentCategory.value?.id === category.id,
      })),
      {
        route: { name: 'home' },
        color: '#FFFFFF',
        position: 'center',
        active: currentCategory.value == null,
      },
    ]);
    return { items, currentCategory };
  },
});
</script>
