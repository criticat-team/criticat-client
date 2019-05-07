<template>
  <div>
    <!-- TODO: Create custom tab selector -->
    <v-tabs
      v-model="tabSelectorPosition"
      grow
      centered
      :hide-slider="true"
      color="primary"
      slider-color="white"
      dark
      :mandatory="false"
      @change="selectTab"
    >
      <v-tab v-for="(categoryItem, i) in categories" :key="i" ripple>
        <v-icon>{{ categoryItem.icon }}</v-icon>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="visibleTab" :mandatory="false">
      <v-tab-item v-for="(categoryItem, i) in categories" :key="i">
        <v-list>
          <v-list-tile
            v-for="(sectionItem, n) in categoryItem.sections"
            :key="n"
            :to="sectionItem.to"
            router
            exact
          >
            <v-list-tile-action>
              <v-icon>{{ sectionItem.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="sectionItem.title" />
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import categories from '@/assets/js/categories';
import sections from '@/assets/js/sections';

export default {
  props: {
    category: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      tabSelectorPosition: null,
      visibleTab: null,
      categories: Object.values(categories).map(category => {
        return {
          id: category.id,
          icon: category.icon,
          title: category.title,
          to: {
            name: 'category',
            params: {
              category: category.id,
            },
          },
          sections: Object.values(sections)
            .filter(section => section.compatibility.includes(category.id))
            .map(section => {
              return {
                icon: section.icon,
                title: section.title,
                to: {
                  name: section.route,
                  params: {
                    category: category.id,
                  },
                },
              };
            }),
        };
      }),
    };
  },
  watch: {
    category() {
      this.updateSelectedTab();
    },
  },
  created() {
    this.updateSelectedTab();
  },
  methods: {
    updateSelectedTab() {
      const targetPosition =
        this.category !== null
          ? this.categories.findIndex(category => category.id === this.category.id)
          : null;
      this.tabSelectorPosition = targetPosition;
      this.visibleTab = targetPosition;
    },
    selectTab(newTab) {
      if (newTab === undefined) {
        this.tabSelectorPosition = this.visibleTab;
        return;
      }
      const currentRouteName = this.$route.name;
      const targetRouteName = currentRouteName === 'index' ? 'category' : currentRouteName;
      this.$router.push({
        name: targetRouteName,
        params: {
          category: this.categories[newTab].id,
        },
      });
    },
  },
};
</script>

<style></style>
