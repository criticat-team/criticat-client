<template>
  <div>
    <!-- TODO: Create custom tab selector -->
    <v-tabs
      v-model="tabSelectorPosition"
      grow
      centered
      :hide-slider="true"
      dark
      :mandatory="false"
      @change="selectTab"
    >
      <v-tab
        v-for="(categoryItem, i) in categories"
        :key="i"
        :ripple="true"
        :style="{
          backgroundColor: categoryItem.color,
          transition: 'filter 0.3s',
          filter:
            tabSelectorPosition == null || tabSelectorPosition === i
              ? 'brightness(100%)'
              : 'brightness(75%)',
        }"
      >
        <v-icon>{{ categoryItem.icon }}</v-icon>
      </v-tab>
    </v-tabs>
    <v-list>
      <v-list-tile
        v-for="(section, n) in visibleSections"
        :key="n"
        :to="{
          name: section.route,
          params: {
            category: category.id,
          },
        }"
        router
        exact
      >
        <v-list-tile-action>
          <v-icon>{{ section.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title v-text="section.title" />
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
import categories from '@/assets/js/categories';
import sections from '@/assets/js/sections';
import colors from 'vuetify/es5/util/colors';

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
      categories: Object.values(categories),
      sections: Object.values(sections),
    };
  },
  computed: {
    visibleSections() {
      return this.category !== null
        ? this.sections.filter(section => section.compatibility.includes(this.category.id))
        : [];
    },
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
      this.$vuetify.theme.primary =
        this.category !== null ? this.category.color : colors.grey.darken3;
    },
    selectTab(newTab) {
      if (newTab === undefined) {
        this.$router.push({
          name: 'index',
        });
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
