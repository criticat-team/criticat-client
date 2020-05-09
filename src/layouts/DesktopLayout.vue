<template>
  <v-app>
    <v-navigation-drawer
      permanent
      app
      dark
      color="grey darken-4"
      disable-resize-watcher
      disable-router-watcher
      stateless
    >
      <div class="my-3 mx-3">
        <app-search-field />
      </div>
      <div class="my-3 mx-3">
        <category-selector />
      </div>
      <div class="my-3 mx-3">
        <app-menu />
      </div>
      <template #append>
        <div class="my-10 d-flex align-center justify-center">
          <div style="width: 32px; height: 32px;" class="mr-2 flex-shrink-0">
            <app-logo />
          </div>
          <div class="text-center text-h5 white--text" style="cursor: default;">CRITICAT</div>
        </div>
      </template>
    </v-navigation-drawer>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';
import CategorySelector from '@/components/category-selector/CategorySelector.vue';
import AppLogo from '@/components/logo/AppLogo.vue';
import AppMenu from '@/components/ui/AppMenu.vue';
import AppSearchField from '@/components/ui/AppSearchField.vue';

export default defineComponent({
  components: {
    CategorySelector,
    AppLogo,
    AppMenu,
    AppSearchField,
  },
});
</script>
