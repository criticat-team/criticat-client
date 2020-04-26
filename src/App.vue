<template>
  <v-app>
    <v-navigation-drawer
      permanent
      app
      dark
      color="grey darken-4"
      :mini-variant="false"
      :expand-on-hover="false"
      mini-variant-width="80"
      disable-resize-watcher
      disable-router-watcher
      stateless
    >
      <div class="my-3 mx-3">
        <v-text-field
          flat
          solo-inverted
          hide-details
          :prepend-inner-icon="mdiMagnify"
          label="Search"
        />
      </div>
      <div class="my-3 mx-3">
        <category-selector />
      </div>
      <div class="my-3 mx-3">
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
      </div>
      <template #append>
        <div class="my-10 d-flex align-center justify-center">
          <div style="width: 32px; height: 32px;" class="mr-2 flex-shrink-0">
            <app-logo />
          </div>
          <div class="text-center headline white--text" style="cursor: default;">CRITICAT</div>
        </div>
      </template>
    </v-navigation-drawer>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, watch, computed } from '@vue/composition-api';
import CategorySelector from '@/components/category-selector/CategorySelector.vue';
import AppLogo from '@/components/logo/AppLogo.vue';
import { mdiMagnify } from '@mdi/js';
import store from '@/store';

export default defineComponent({
  name: 'App',
  components: {
    CategorySelector,
    AppLogo,
  },
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
    const categories = store.state.categories;

    const currentCategoryId = computed(() => context.root.$route.params.categoryId);
    watch(currentCategoryId, (currentCategoryId) => {
      store.commit.setCurrentCategoryId(currentCategoryId);
    });

    const currentCategory = computed(() => store.getters.currentCategory);
    const primaryColor = computed(() =>
      currentCategory.value ? currentCategory.value.color : '#333333',
    );

    watch(primaryColor, (primaryColor) => {
      context.root.$vuetify.theme.currentTheme.primary = primaryColor;
    });

    const sections = computed(() => store.getters.currentCategorySections);

    return { categories, currentCategory, currentCategoryId, mdiMagnify, sections, primaryColor };
  },
});
</script>
