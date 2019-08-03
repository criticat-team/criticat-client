<template>
  <div>
    <v-card v-if="cardContainer" tag="section" class="slider-section slider-section--card">
      <v-card-title class="slider-section__header">
        <span class="slider-section__header__title overline font-weight-medium" v-text="title" />
        <v-spacer />
        <nuxt-link
          :to="{ name: 'category-articles' }"
          class="slider-section__header__link caption font-weight-medium"
        >
          See more
        </nuxt-link>
      </v-card-title>
      <slider
        class="slider-section__slider"
        :width="width"
        :outer-gap="24"
        :inner-gap="innerGap"
        :show-buttons="false"
      >
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
          See more
        </nuxt-link>
      </div>
      <slider
        class="slider-section__slider"
        :width="width"
        :outer-gap="12"
        :inner-gap="innerGap"
        :show-buttons="true"
      >
        <slot />
      </slider>
    </section>
  </div>
</template>

<script>
import Slider from '@/components/ui/slider/Slider';

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
    cardContainer: {
      type: Boolean,
      mandatory: false,
      default: false,
    },
    width: {
      type: Number,
      mandatory: false,
      default: 300,
    },
    innerGap: {
      type: Number,
      mandatory: false,
      default: 12,
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
    margin-left: -$distance;
    margin-right: -$distance;
  }
  &--card {
    .slider-section {
      &__header {
        padding-bottom: 4px;
      }
    }
  }
}
</style>
