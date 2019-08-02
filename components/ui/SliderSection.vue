<template>
  <div>
    <v-card v-if="card" tag="section" class="slider-section slider-section--card">
      <v-card-title class="slider-section__header">
        <span class="slider-section__header__title overline font-weight-medium" v-text="title" />
        <v-spacer />
        <nuxt-link
          :to="{ name: 'category-articles' }"
          class="slider-section__header__link caption font-weight-medium"
        >
          Mostra-ho tot
        </nuxt-link>
      </v-card-title>
      <slider class="slider-section__slider">
        <slot />
      </slider>
    </v-card>
    <section v-else class="slider-section">
      <div class="slider-section__header">
        <span class="slider-section__header__title subtitle-1 font-weight-medium" v-text="title" />
        <v-spacer />
        <nuxt-link
          :to="{ name: 'category-articles' }"
          class="slider-section__header__link subtitle-1 font-weight-medium"
        >
          Mostra-ho tot
        </nuxt-link>
      </div>
      <slider class="slider-section__slider">
        <slot />
      </slider>
    </section>
  </div>
</template>

<script>
import Slider from '@/components/ui/Slider';

export default {
  components: {
    Slider,
  },
  props: {
    title: {
      type: String,
      mandatory: true,
      default: '',
    },
    card: {
      type: Boolean,
      mandatory: false,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
$distance: 12px;
.slider-section {
  padding-bottom: $distance - 8px;
  margin-bottom: 20px;
  &__header {
    display: flex;
    flex-direction: row;
    &__link {
      text-decoration: none;
    }
  }
  &__slider {
  }
  &--card {
    .slider-section {
      &__header {
        padding-bottom: 4px;
      }
      &__slider {
        margin-left: -$distance;
        margin-right: -$distance;
        &::before,
        &::after {
          min-width: $distance * 2;
          max-width: $distance * 2;
          content: '';
        }
      }
    }
  }
}
</style>
