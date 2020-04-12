<template>
  <app-logo-container>
    <v-hover v-for="(item, index) in items" :key="index">
      <template v-slot:default="{ hover }">
        <router-link :to="item.route" v-slot="{ navigate, isActive, isExactActive }">
          <app-logo-item
            @click="navigate"
            :active="(item.exact ? isExactActive : isActive) || hover"
            :color="item.color"
            :position="item.position"
          />
        </router-link>
      </template>
    </v-hover>
  </app-logo-container>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';
import AppLogoContainer from '@/components/logo/AppLogoContainer.vue';
import AppLogoItem from '@/components/logo/AppLogoItem.vue';

export default defineComponent({
  components: {
    AppLogoContainer,
    AppLogoItem,
  },
  setup(props, context) {
    const currentCategory = computed(() => context.root.$store.getters.currentCategory);
    const categories = computed(() => context.root.$store.state.categories);
    const items = computed(() => [
      ...Object.values(categories.value).map((category) => ({
        route: { name: 'category.home', params: { categoryId: category.id } },
        color: category.color,
        icon: category.icon,
        position: category.position,
        exact: false,
      })),
      {
        route: { name: 'home' },
        color: 'white',
        position: 'center',
        exact: true,
      },
    ]);
    return { items, currentCategory };
  },
});
</script>
