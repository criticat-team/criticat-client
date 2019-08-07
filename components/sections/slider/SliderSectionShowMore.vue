<template>
  <div>
    <nuxt-link v-if="category !== null" class="show-more-link" :to="localePath(route)">
      {{ $t('components.ui.slider.show_more_button') }}
    </nuxt-link>
    <v-speed-dial
      v-else
      v-model="speedDial"
      class="show-more-buttons"
      direction="bottom"
      transition="slide-y-reverse-transition"
    >
      <template #activator>
        <div class="show-more-buttons__text primary--text">
          {{ $t('components.ui.slider.show_more_button')
          }}<v-icon :size="18">{{ speedDial ? 'arrow_drop_up' : 'arrow_drop_down' }}</v-icon>
        </div>
      </template>
      <v-btn
        v-for="cat in categories"
        :key="cat.id"
        :elevation="6"
        :to="localePath({ ...route, params: { category: $t(`categories.${cat.id}.slug`) } })"
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
      type: Object,
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
