<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <div class="app-slider">
        <ul
          ref="itemsContainer"
          v-resize.quiet="onContainerResize"
          class="app-slider__items pa-0"
          @scroll="onScroll"
        >
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
import { defineComponent, computed, ref, reactive, onMounted } from '@vue/composition-api';
import VueScrollTo from 'vue-scrollto';

export default defineComponent({
  props: {},
  components: {},
  setup(props, context) {
    const showButtons = computed(() => !context.root.$screen.touch);

    const state = reactive({
      scrollPosition: null,
      scrollWidth: null,
      clientWidth: null,
    });
    const itemsContainer = ref(null);

    const visibleArea = computed(() => ({
      start: state.scrollPosition,
      end: state.scrollPosition + state.clientWidth,
    }));

    let itemsContainerElement: HTMLElement = null;
    const updateContainerSize = () => {
      state.scrollWidth = itemsContainerElement.scrollWidth;
      state.clientWidth = itemsContainerElement.clientWidth;
    };

    const updateScrollPosition = () => {
      state.scrollPosition = itemsContainerElement.scrollLeft;
    };

    const showLeftButton = computed(() => visibleArea.value.start > 0);
    const showRightButton = computed(() => visibleArea.value.end < state.scrollWidth);

    const scrollToElement = (element: Element) => {
      VueScrollTo.scrollTo(element, 300, {
        container: itemsContainerElement,
        offset: -8,
        x: true,
        y: false,
      });
    };

    const navigatePrevious = () => {
      const items = [...itemsContainerElement.children] as HTMLElement[];
      const firstVisibleLeft = items.find((item) => item.offsetLeft >= visibleArea.value.start);
      const target = items.find(
        (item) => item.offsetLeft + state.clientWidth >= firstVisibleLeft.offsetLeft,
      );
      scrollToElement(target);
    };

    const navigateNext = () => {
      const items = [...itemsContainerElement.children] as HTMLElement[];
      const firstHiddenRight = items.find(
        (item) => item.offsetLeft + item.clientWidth >= visibleArea.value.end,
      );
      scrollToElement(firstHiddenRight);
    };

    onMounted(() => {
      itemsContainerElement = itemsContainer.value;
      if (showButtons.value) {
        // $nextTick is needed because vuetify adjusts the content padding after mount
        context.root.$nextTick(() => {
          updateScrollPosition();
          updateContainerSize();
        });
      }
    });

    const onScroll = () => {
      if (showButtons.value) {
        updateScrollPosition();
      }
    };

    const onContainerResize = () => {
      if (showButtons.value) {
        updateContainerSize();
      }
    };

    return {
      itemsContainer,
      mdiChevronLeft,
      mdiChevronRight,
      onScroll,
      onContainerResize,
      showButtons,
      showRightButton,
      showLeftButton,
      navigateNext,
      navigatePrevious,
      state,
    };
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
