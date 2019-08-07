<template>
  <div>
    <v-list flat>
      <v-list-item
        v-for="(page, n) in visiblePages"
        :key="n"
        :to="
          localePath({
            name: page.routeName,
            params: {
              category: $t(`categories.${category.id}.slug`),
            },
          })
        "
        nuxt
        exact
      >
        <v-list-item-action>
          <v-icon>{{ page.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="$t(`pages.${page.id}.name`)" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import pages from '@/assets/js/pages';

export default {
  data() {
    return {
      visibleTab: null,
      pages: Object.values(pages),
    };
  },
  computed: {
    ...mapState(['category']),
    visiblePages() {
      return this.category !== null
        ? this.pages.filter(page => page.compatibility.includes(this.category.id))
        : [];
    },
  },
};
</script>
