<template>
  <div>
    <v-list flat>
      <v-list-item
        v-for="(section, n) in visibleSections"
        :key="n"
        :to="{
          name: section.route,
          params: {
            category: category.id,
          },
        }"
        nuxt
        exact
      >
        <v-list-item-action>
          <v-icon>{{ section.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="section.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
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
      visibleTab: null,
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
};
</script>
