<template>
  <div>
    <v-list flat>
      <v-list-item
        v-for="(section, n) in visibleSections"
        :key="n"
        :to="
          localePath({
            name: section.routeName,
            params: {
              category: $t(`categories.${category.id}.route`),
            },
          })
        "
        nuxt
        exact
      >
        <v-list-item-action>
          <v-icon>{{ section.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="$t(`sections.${section.id}.name`)" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import sections from '@/assets/js/sections';

export default {
  data() {
    return {
      visibleTab: null,
      sections: Object.values(sections),
    };
  },
  computed: {
    ...mapState(['category']),
    visibleSections() {
      return this.category !== null
        ? this.sections.filter(section => section.compatibility.includes(this.category.id))
        : [];
    },
  },
};
</script>
