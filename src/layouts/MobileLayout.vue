<template>
  <v-app>
    <v-navigation-drawer
      disable-route-watcher
      v-model="showDrawer"
      dark
      fixed
      color="grey darken-4"
      width="100%"
    >
      <div class="my-3 mx-3">
        <app-search-field />
      </div>
      <div class="mx-3 my-8 d-flex justify-center">
        <category-selector style="max-width: 200px;" />
      </div>
      <div class="mx-3 my-8">
        <app-menu />
      </div>
    </v-navigation-drawer>
    <v-content>
      <router-view />
    </v-content>
    <v-fab-transition>
      <v-btn
        class="floating-button"
        style="z-index: 6;"
        @click="toggleDrawer"
        :dark="showDrawer"
        fab
        fixed
        bottom
        :key="showDrawer"
      >
        <v-icon v-if="showDrawer">mdi-close</v-icon>
        <app-logo v-else width="28" />
      </v-btn>
    </v-fab-transition>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@vue/composition-api';
import CategorySelector from '@/components/category-selector/CategorySelector.vue';
import AppMenu from '@/components/ui/AppMenu.vue';
import AppSearchField from '@/components/ui/AppSearchField.vue';
import AppLogo from '@/components/logo/AppLogo.vue';

export default defineComponent({
  components: {
    CategorySelector,
    AppLogo,
    AppMenu,
    AppSearchField,
  },
  setup(params, context) {
    const showDrawer = ref(false);
    watch(
      () => context.root.$route,
      () => {
        if (showDrawer.value) {
          setTimeout(() => {
            showDrawer.value = false;
          }, 350);
        }
      },
    );

    const toggleDrawer = () => {
      showDrawer.value = !showDrawer.value;
    };

    return {
      showDrawer,
      toggleDrawer,
    };
  },
});
</script>

<style lang="scss" scoped>
.floating-button {
  left: calc(50% - 28px);
}
</style>
