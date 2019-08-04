<template>
  <div class="slider">
    <slider-content
      ref="sliderContent"
      v-resize="calculateSliderWidth"
      class="slider__content"
      :outer-gap="outerGap"
      :inner-gap="innerGap"
      :width="width"
      @scroll.native="handleScroll"
      ><slot
    /></slider-content>
    <template v-if="showButtons">
      <v-btn
        class="slider__button white"
        :class="{ 'slider__button--hidden': !leftButtonIsVisible }"
        :style="{ left: `${12 + outerGap}px` }"
        absolute
        left
        small
        fab
        @click="navigatePrevious"
      >
        <v-icon>chevron_left</v-icon>
      </v-btn>
      <v-btn
        class="slider__button white"
        :class="{ 'slider__button--hidden': !rightButtonIsVisible }"
        :style="{ right: `${12 + outerGap}px` }"
        absolute
        right
        small
        fab
        @click="navigateNext"
      >
        <v-icon>chevron_right</v-icon>
      </v-btn>
    </template>
  </div>
</template>

<script>
import SliderContent from './SliderContent';

export default {
  components: {
    SliderContent,
  },
  props: {
    showButtons: {
      type: Boolean,
      mandatory: false,
      default: true,
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
    outerGap: {
      type: Number,
      mandatory: false,
      default: 24,
    },
  },
  data() {
    return {
      scrollPosition: 0,
      sliderScrollWidth: null,
      sliderClientWidth: null,
    };
  },
  computed: {
    visibleArea() {
      return {
        start: this.scrollPosition,
        end: this.scrollPosition + this.sliderClientWidth - this.outerGap * 2,
      };
    },
    leftButtonIsVisible() {
      return this.scrollPosition !== 0;
    },
    rightButtonIsVisible() {
      return this.scrollPosition + this.sliderClientWidth !== this.sliderScrollWidth;
    },
    items() {
      return this.$slots.default.map((item, key) => {
        return {
          key,
          ...this.getPosition(key),
        };
      });
    },
    maxVisibleItems() {
      return Math.floor(
        (this.visibleArea.end - this.visibleArea.start + this.innerGap) /
          (this.width + this.innerGap),
      );
    },
    visibleItems() {
      return this.items.filter(item => this.isVisible(item));
    },
    firstVisible() {
      return this.visibleItems[0];
    },
    lastVisible() {
      return this.visibleItems[this.visibleItems.length - 1];
    },
  },
  methods: {
    navigateNext() {
      this.navigateTo(Math.min(this.items.length - 1, this.lastVisible.key + 1));
    },
    navigatePrevious() {
      this.navigateTo(Math.max(0, this.firstVisible.key - this.maxVisibleItems));
    },
    navigateTo(position) {
      this.$scrollTo(this.$refs.sliderContent.$children[position].$el, 300, {
        container: this.$refs.sliderContent.$el,
        offset: -this.outerGap,
        x: true,
        y: false,
      });
    },
    isVisible(item) {
      return item.start >= this.visibleArea.start && item.end <= this.visibleArea.end;
    },
    getPosition(i) {
      const start = this.width * i + this.innerGap * i;
      return {
        start,
        end: start + this.width,
      };
    },
    calculateSliderWidth() {
      this.sliderScrollWidth = this.$refs.sliderContent.$el.scrollWidth;
      this.sliderClientWidth = this.$refs.sliderContent.$el.clientWidth;
    },
    handleScroll(ev) {
      this.scrollPosition = ev.target.scrollLeft;
    },
  },
};
</script>

<style lang="scss" scoped>
.slider {
  position: relative;
  &__content {
    padding: 8px 0;
  }
  &__button {
    z-index: 4; // Higher than overlay
    top: 0;
    bottom: 0;
    margin: auto;
    transition: opacity 0.5s, visibility 0.5s;
    &--hidden {
      visibility: hidden;
      opacity: 0;
    }
  }
}
</style>
