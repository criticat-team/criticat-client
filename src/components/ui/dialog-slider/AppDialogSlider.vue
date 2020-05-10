<template>
  <div class="app-dialog-slider" :class="{ 'app-dialog-slider--fullscreen': fullscreen }">
    <v-dialog
      class="app-dialog-slider__dialog"
      :fullscreen="fullscreen"
      :max-width="dialogWidth"
      :value="true"
      @input="$event ? null : close()"
    >
      <v-window
        class="fill-height"
        :continuous="false"
        :value="value"
        @input="$emit('input', $event)"
        hide-delimiters
        :show-arrows="false"
      >
        <slot />
      </v-window>
    </v-dialog>
    <template v-if="showArrows">
      <v-fade-transition>
        <v-btn
          class="app-dialog-slider__button app-dialog-slider__button--navigation"
          :style="navigatePreviousStyle"
          v-show="navigatePreviousVisible"
          fixed
          dark
          left
          icon
          @click="navigatePrevious"
        >
          <v-icon large>{{ mdiChevronLeft }}</v-icon>
        </v-btn>
      </v-fade-transition>
      <v-fade-transition>
        <v-btn
          class="app-dialog-slider__button app-dialog-slider__button--navigation"
          :style="navigateNextStyle"
          v-show="navigateNextVisible"
          fixed
          dark
          right
          icon
          @click="navigateNext"
        >
          <v-icon large>{{ mdiChevronRight }}</v-icon>
        </v-btn>
      </v-fade-transition>
    </template>
    <v-btn class="app-dialog-slider__button" fixed top right icon dark @click="close">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { useKeyboard } from '@/use/keyboard';
import { Key } from 'ts-key-enum';

export default defineComponent({
  props: {
    value: Number,
    total: Number,
  },
  setup(props, context) {
    // Layout
    const DIALOG_WIDTH = 480;
    const fullscreen = computed(() => context.root.$vuetify.breakpoint.xs);
    const dialogWidth = computed(() => (fullscreen.value ? '100%' : DIALOG_WIDTH));
    const sliderHeight = computed(() => (fullscreen.value ? '100%' : '700'));

    // Arrows
    const ARROWS_WIDTH = 36;
    const ARROWS_DISTANCE_FROM_DIALOG = 10;
    const showArrows = computed(() => !fullscreen.value);
    const arrowsCalcFromEdge = `calc(50% - ${
      DIALOG_WIDTH / 2
    }px - ${ARROWS_DISTANCE_FROM_DIALOG}px - ${ARROWS_WIDTH}px)`;
    const navigatePreviousStyle = {
      left: arrowsCalcFromEdge,
    };
    const navigateNextStyle = {
      right: arrowsCalcFromEdge,
    };

    // Navigation
    const length = computed(() =>
      props.total != null ? props.total : context.slots.default().length,
    );
    const canNavigateNext = computed(() => props.value !== length.value - 1);
    const canNavigatePrevious = computed(() => props.value > 0);

    const navigateNext = () => {
      if (canNavigateNext.value) {
        context.emit('input', props.value + 1);
      }
    };
    const navigatePrevious = () => {
      if (canNavigatePrevious.value) {
        context.emit('input', props.value - 1);
      }
    };

    const close = () => {
      context.emit('close');
    };

    useKeyboard({
      [Key.ArrowLeft]: navigatePrevious,
      [Key.ArrowRight]: navigateNext,
    });

    return {
      dialogWidth,
      fullscreen,
      sliderHeight,
      showArrows,
      close,
      length,
      navigateNext,
      navigateNextStyle,
      navigateNextVisible: canNavigateNext,
      navigatePrevious,
      navigatePreviousStyle,
      navigatePreviousVisible: canNavigatePrevious,
      mdiChevronLeft,
      mdiChevronRight,
    };
  },
});
</script>

<style lang="scss">
.app-dialog-slider {
  &__button {
    z-index: 300;
    &--navigation {
      top: calc(50% - 20px);
    }
  }
  &--fullscreen {
    .app-dialog-slider {
      &__button {
        background: rgba(0, 0, 0, 0.3);
      }
    }
  }
}
</style>
