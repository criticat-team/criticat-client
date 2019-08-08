<template>
  <div>
    <v-list flat>
      <v-list-item
        v-for="page in compatiblePages"
        :key="page.id"
        :to="
          localePath({
            name: page.routeName,
            params: {
              category: category.slug,
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
          <v-list-item-title v-text="page.name" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  data() {
    return {
      visibleTab: null,
    };
  },
  computed: {
    ...mapState(['category', 'pages']),
    ...mapGetters(['compatiblePages']),
  },
};
</script>
