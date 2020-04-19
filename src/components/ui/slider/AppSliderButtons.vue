<template>
  <div class="app-slider-buttons">
    <v-fade-transition>
      <v-btn
        class="app-slider-buttons__button primary--text"
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
        class="app-slider-buttons__button primary--text"
        :class="{ 'app-slider-buttons__button--hidden': !hover }"
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
  </div>
</template>

<script lang="ts">
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { defineComponent, Ref, ref, onMounted } from '@vue/composition-api';
import { useSliderButtons } from './use/slider-buttons';

export default defineComponent({
  props: {
    hover: Boolean,
  },
  setup(props, context) {
    // TODO: Find a way of accessing parent ref or passing ref as prop
    const containerElement: Ref<HTMLElement> = ref(null);
    onMounted(() => {
      containerElement.value = context.parent.$el.getElementsByClassName(
        'app-slider__items',
      )[0] as HTMLElement;
    });

    const { showRightButton, showLeftButton, navigateNext, navigatePrevious } = useSliderButtons(
      containerElement,
    );
    return {
      mdiChevronLeft,
      mdiChevronRight,
      showRightButton,
      showLeftButton,
      navigateNext,
      navigatePrevious,
    };
  },
});
</script>

<style lang="scss" scoped>
.app-slider-buttons {
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
