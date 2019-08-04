<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      class="navigation-drawer"
      dark
      :permanent="permanentDrawer"
      width="320"
      :touchless="permanentDrawer"
      app
    >
      <nuxt-link class="navigation-drawer__home" :to="{ name: 'index' }">
        <v-toolbar v-ripple style="cursor: pointer;" color="grey darken-3" dark>
          <v-toolbar-title style="margin: 0 auto;" v-text="title" />
        </v-toolbar>
      </nuxt-link>
      <v-bottom-navigation dark shift grow>
        <v-btn
          v-for="cat in categories"
          :key="cat.id"
          :to="{
            name: 'category',
            params: {
              category: cat.id,
            },
          }"
          nuxt
          :color="cat.color"
        >
          <span>{{ cat.title }}</span>
          <v-icon>{{ cat.icon }}</v-icon>
        </v-btn>
      </v-bottom-navigation>
      <layout-menu class="navigation-drawer__sections" :category="category" />
    </v-navigation-drawer>
    <v-app-bar class="hidden-md-and-up" color="primary" dark fixed hide-on-scroll height="56">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-spacer />
      <nuxt-link class="navigation-drawer__home" :to="{ name: 'index' }">
        <v-toolbar-title class="white--text" v-text="title" />
      </nuxt-link>
      <v-spacer />
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-app-bar>
    <v-app-bar app flat class="hidden-sm-and-down" color="transparent" height="64" fixed>
      <v-text-field hide-details solo prepend-inner-icon="search" label="Search"></v-text-field>
    </v-app-bar>
    <v-content>
      <v-container grid-list-lg>
        <nuxt />
      </v-container>
    </v-content>
    <v-bottom-navigation v-show="!permanentDrawer" app dark shift grow hide-on-scroll>
      <v-btn
        v-for="cat in categories"
        :key="cat.id"
        :to="{
          name: 'category',
          params: {
            category: cat.id,
          },
        }"
        nuxt
        :color="cat.color"
      >
        <span>{{ cat.title }}</span>
        <v-icon>{{ cat.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import colors from 'vuetify/es5/util/colors';
import LayoutMenu from '@/components/layout/menu';
import categories from '@/assets/js/categories';

export default {
  components: {
    LayoutMenu,
  },
  data() {
    return {
      visibleTab: null,
      categories,
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
    ...mapState(['category']),
    permanentDrawer() {
      return this.$vuetify.breakpoint.mdAndUp;
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
      this.$vuetify.theme.currentTheme.primary =
        this.category != null ? this.category.color : colors.grey.darken3;
    },
  },
};
</script>

<style lang="scss">
.navigation-drawer {
  &__home {
    text-decoration: none;
  }
}
</style>
