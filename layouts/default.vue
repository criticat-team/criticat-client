<template>
  <v-app>
    <v-navigation-drawer v-if="mobile" v-model="drawer" fixed app>
      <v-list>
        <v-list-tile v-for="(item, i) in items" :key="i" :to="item.to" router>
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar primary dark color="primary" fixed app flat>
      <v-toolbar-side-icon v-if="mobile" @click="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-tabs
        v-if="!mobile"
        icons-and-text
        dark
        centered
        color="transparent"
        height="84"
      >
        <v-tabs-slider
          color="primary"
          class="tabs-slider-arrow"
        ></v-tabs-slider>
        <v-tab v-for="(item, i) in items" :key="i" ripple :to="item.to" router>
          {{ item.title }}
          <v-icon>{{ item.icon }}</v-icon>
        </v-tab>
      </v-tabs>
      <v-spacer />
      <v-btn>a</v-btn>
    </v-toolbar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import categories from '@/assets/js/categories'

export default {
  data() {
    return {
      mobile: false,
      drawer: false,
      items: categories.map(({ icon, title, id }) => {
        return {
          icon,
          title,
          to: {
            name: 'category',
            params: {
              category: id
            }
          }
        }
      }),
      title: 'Criticat'
    }
  }
}
</script>

<style lang="stylus">
.tabs-slider-arrow {
  width: 0 !important;
  height: 0 !important;
  background-color: transparent !important;
  border-left: 10px solid transparent !important;
  border-right: 10px solid transparent !important;
  border-top: 10px solid;
  margin: 0 auto;
}
</style>
