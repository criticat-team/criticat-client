<template>
  <div class="app-slider-buttons">
    <v-fade-transition>
      <v-btn
        class="app-slider-buttons__button"
        :class="{ 'app-slider-buttons__button--hidden': !hover }"
        v-show="showLeftButton"
        absolute
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
        class="app-slider-buttons__button"
        :class="{ 'app-slider-buttons__button--hidden': !hover }"
        v-show="showRightButton"
        absolute
        dark
        right
        icon
        @click="navigateNext"
      >
        <v-icon large>{{ mdiChevronRight }}</v-icon>
      </v-btn>
    </v-fade-transition>
  </div>
</template>

<script lang="ts">
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { defineComponent, Ref, ref, onMounted } from '@vue/composition-api';
import VueScrollTo from 'vue-scrollto';
import useScrollState from '@/use/scroll-state';

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

    const {
      clientWidth,
      visibleAreaStart,
      visibleAreaEnd,
      canScrollLeft,
      canScrollRight,
    } = useScrollState(containerElement);

    const navigateTo = (items: HTMLElement[], element: HTMLElement) => {
      const firstItemToShowIndex = items.indexOf(element);
      const firstItemToShowStart = element.offsetLeft;

      const lastItemToShow = items.find((item, index) => {
        if (index < firstItemToShowIndex) {
          return false;
        }
        if (index === items.length - 1) {
          return true;
        }
        const nextElementSibling = item.nextSibling as HTMLElement;
        return (
          nextElementSibling.offsetLeft + nextElementSibling.clientWidth >
          firstItemToShowStart + clientWidth.value
        );
      });

      const lastItemToShowEnd = lastItemToShow.offsetLeft + lastItemToShow.clientWidth;

      const offset = -(clientWidth.value + firstItemToShowStart - lastItemToShowEnd) / 2;

      VueScrollTo.scrollTo(element, 300, {
        container: containerElement.value,
        offset,
        x: true,
        y: false,
      });
    };

    const getItems = (): HTMLElement[] => {
      return [...containerElement.value.children] as HTMLElement[];
    };

    const navigatePrevious = () => {
      const items = getItems();
      const firstVisibleLeft = items.find((item) => item.offsetLeft >= visibleAreaStart.value);
      const firstItemToShow = items.find(
        (item) => item.offsetLeft + clientWidth.value >= firstVisibleLeft.offsetLeft,
      );
      if (firstItemToShow != null) {
        navigateTo(items, firstItemToShow);
      }
    };

    const navigateNext = () => {
      const items = getItems();

      const firstItemToShow = items.find(
        (item) => item.offsetLeft + item.clientWidth >= visibleAreaEnd.value,
      );

      if (firstItemToShow != null) {
        navigateTo(items, firstItemToShow);
      }
    };

    return {
      mdiChevronLeft,
      mdiChevronRight,
      showRightButton: canScrollRight,
      showLeftButton: canScrollLeft,
      navigateNext,
      navigatePrevious,
    };
  },
});
</script>

<style lang="scss" scoped>
.app-slider-buttons {
  &__button {
    top: calc(50% - 20px);
    background: rgba(0, 0, 0, 0.3);

    &--hidden {
      opacity: 0;
    }

    &:hover {
      opacity: 1;
    }
  }
}
</style>
