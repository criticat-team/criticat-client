<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <div class="app-slider">
        <ul ref="itemsContainerRef" class="app-slider__items pa-0">
          <slot />
        </ul>
        <template v-if="showButtons">
          <v-fade-transition>
            <v-btn
              class="app-slider__button primary--text"
              :class="{ 'app-slider__button--hidden': !hover }"
              v-show="showLeftButton"
              absolute
              left
              small
              fab
              @click="navigatePrevious"
            >
              <v-icon>{{ mdiChevronLeft }}</v-icon>
            </v-btn>
          </v-fade-transition>
          <v-fade-transition>
            <v-btn
              class="app-slider__button primary--text"
              :class="{ 'app-slider__button--hidden': !hover }"
              v-show="showRightButton"
              absolute
              right
              small
              fab
              @click="navigateNext"
            >
              <v-icon>{{ mdiChevronRight }}</v-icon>
            </v-btn>
          </v-fade-transition>
        </template>
      </div>
    </template>
  </v-hover>
</template>

<script lang="ts">
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { defineComponent, ref, Ref } from '@vue/composition-api';
import { useSliderButtons } from './use/slider-buttons';

export default defineComponent({
  props: {},
  components: {},
  setup(props, context) {
    const showButtons = !context.root.$screen.touch;

    const itemsContainerRef: Ref<HTMLElement> = ref(null);
    const resetScroll = () => {
      itemsContainerRef.value.scrollLeft = 0;
    };

    if (showButtons) {
      const { showRightButton, showLeftButton, navigateNext, navigatePrevious } = useSliderButtons(
        itemsContainerRef,
      );
      return {
        showButtons,
        resetScroll,
        itemsContainerRef,
        mdiChevronLeft,
        mdiChevronRight,
        showRightButton,
        showLeftButton,
        navigateNext,
        navigatePrevious,
      };
    } else {
      return {
        showButtons,
        resetScroll,
      };
    }
  },
});
</script>

<style lang="scss" scoped>
.app-slider {
  position: relative;
  &__items {
    display: flex;
    overflow-x: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  &__button {
    opacity: 0.8;
    top: calc(50% - 20px);

    &--hidden {
      opacity: 0;
    }

    &:hover {
      opacity: 1;
    }
  }
}
</style>
