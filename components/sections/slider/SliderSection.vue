<template>
  <component :is="layoutComponent" :title="title">
    <template v-if="showMoreRoute !== null" #show-more>
      <slider-section-show-more :category="category" :route="showMoreRoute" />
    </template>
    <template #slider="{ outerGap, showButtons }">
      <slider
        :width="width"
        :outer-gap="outerGap"
        :inner-gap="innerGap"
        :show-buttons="showButtons"
      >
        <slot />
      </slider>
    </template>
  </component>
</template>

<script>
import Slider from '@/components/ui/slider/Slider';
import CardSliderSectionLayout from '@/components/sections/slider/layouts/CardSliderSectionLayout';
import SimpleSliderSectionLayout from '@/components/sections/slider/layouts/SimpleSliderSectionLayout';
import SliderSectionShowMore from '@/components/sections/slider/SliderSectionShowMore';

export default {
  components: {
    Slider,
    SliderSectionShowMore,
  },
  props: {
    category: {
      type: Object,
      mandatory: true,
      default: null,
    },
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
    showMoreRoute: {
      type: Object,
      mandatory: false,
      default: null,
    },
  },
  computed: {
    layoutComponent() {
      return this.cardContainer ? CardSliderSectionLayout : SimpleSliderSectionLayout;
    },
  },
};
</script>
