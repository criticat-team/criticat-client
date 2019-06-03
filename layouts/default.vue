<template>
  <v-app>
    <!-- TODO: Find a pure CSS solution instead of JS permamentDrawer -->
    <v-navigation-drawer v-model="drawer" dark :permanent="permanentDrawer" app @click="goToRoot">
      <v-toolbar v-ripple style="cursor: pointer" flat color="grey darken-3" dark @click="goToRoot">
        <v-toolbar-title style="margin: 0 auto;" v-text="title" />
      </v-toolbar>
      <layout-menu :category="category" />
    </v-navigation-drawer>
    <!-- TODO: Find a pure CSS solution instead of two toolbars -->
    <v-toolbar class="hidden-md-and-up" color="primary" dark fixed app>
      <v-toolbar-side-icon @click="drawer = !drawer" />
      <v-spacer />
      <v-toolbar-title class="ma-0" v-text="title" />
      <v-spacer />
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>
    <v-toolbar class="hidden-sm-and-down" color="transparent" flat fixed app>
      <v-text-field
        class="mt-1 mb-0"
        solo
        prepend-inner-icon="search"
        label="Search"
      ></v-text-field>
    </v-toolbar>
    <v-content>
      <v-container grid-list-lg>
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
      title: 'Criticat',
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        { hid: 'theme-color', name: 'theme-color', content: this.$vuetify.theme.primary },
      ],
    };
  },
  computed: {
    permanentDrawer() {
      return this.$vuetify.breakpoint.mdAndUp;
    },
    ...mapState(['category']),
  },
  methods: {
    goToRoot() {
      this.$router.push({ name: 'index' });
    },
  },
};
</script>
