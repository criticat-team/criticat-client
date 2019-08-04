<template>
  <div>
    <nuxt-link v-if="category !== null" class="show-more-link" :to="route">
      Show more
    </nuxt-link>
    <v-speed-dial
      v-else
      v-model="speedDial"
      class="show-more-buttons"
      direction="bottom"
      transition="slide-y-reverse-transition"
    >
      <template v-slot:activator>
        <div class="show-more-buttons__text primary--text">
          Show more <span v-text="speedDial ? '⯅' : '⯆'"></span>
        </div>
      </template>
      <v-btn
        v-for="cat in categories"
        :key="cat.id"
        :elevation="6"
        :to="{ ...route, params: { category: cat.id } }"
        nuxt
        fab
        dark
        small
        :color="cat.color"
      >
        <v-icon>{{ cat.icon }}</v-icon>
      </v-btn>
    </v-speed-dial>
  </div>
</template>

<script>
import categories from '@/assets/js/categories';

export default {
  props: {
    route: {
      type: Object,
      mandatory: true,
      default: null,
    },
    category: {
      type: String,
      mandatory: true,
      default: null,
    },
  },
  data() {
    return {
      speedDial: false,
      categories,
    };
  },
};
</script>

<style lang="scss" scoped>
.show-more-link {
  text-decoration: none;
}
.show-more-buttons {
  z-index: 5;
  &__text {
    cursor: pointer;
  }
}
</style>
