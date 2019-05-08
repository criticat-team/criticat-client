<template>
  <v-app v-show="mounted">
    <v-navigation-drawer v-model="drawer" dark :permanent="permanentDrawer" app @click="goToRoot">
      <v-toolbar v-ripple style="cursor: pointer" flat color="grey darken-3" dark @click="goToRoot">
        <v-toolbar-title style="margin: 0 auto;" v-text="title" />
      </v-toolbar>
      <layout-menu :category="category" />
    </v-navigation-drawer>
    <v-toolbar
      :color="permanentDrawer ? 'transparent' : 'primary'"
      :flat="permanentDrawer"
      :dark="!permanentDrawer"
      fixed
      app
    >
      <v-text-field
        v-if="permanentDrawer"
        class="mt-1 mb-0"
        solo
        prepend-inner-icon="search"
        label="Search"
      ></v-text-field>
      <template v-if="!permanentDrawer">
        <v-toolbar-side-icon @click="drawer = !drawer" />
        <v-spacer />
        <v-toolbar-title class="ma-0" v-text="title" />
        <v-spacer />
        <v-btn icon>
          <v-icon>search</v-icon>
        </v-btn>
      </template>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import LayoutMenu from '@/components/layout/menu';
import { mapState } from 'vuex';

export default {
  components: {
    LayoutMenu,
  },
  data() {
    return {
      drawer: null,
      mounted: false,
      title: 'Criticat',
    };
  },
  computed: {
    permanentDrawer() {
      if (this.mounted) {
        return this.$vuetify.breakpoint.mdAndUp;
      }
      return false;
    },
    ...mapState(['category']),
  },
  mounted() {
    // TODO: Find a better solution
    this.$nextTick(() => {
      this.mounted = true;
    });
  },
  methods: {
    goToRoot() {
      this.$router.push({ name: 'index' });
    },
  },
};
</script>
