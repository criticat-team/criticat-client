import { computed, onMounted, Ref, ref, onUnmounted } from '@vue/composition-api';
import Vue from 'vue';

export function useScrollState(
  target: Ref<HTMLElement>,
): {
  scrollPosition: Ref<number>;
  scrollWidth: Ref<number>;
  clientWidth: Ref<number>;
  visibleAreaStart: Ref<number>;
  visibleAreaEnd: Ref<number>;
  canScrollLeft: Ref<boolean>;
  canScrollRight: Ref<boolean>;
} {
  const scrollPosition: Ref<number> = ref(null);
  const scrollWidth: Ref<number> = ref(null);
  const clientWidth: Ref<number> = ref(null);
  const visibleAreaStart = computed(() => scrollPosition.value);
  const visibleAreaEnd = computed(() => scrollPosition.value + clientWidth.value);
  const canScrollLeft = computed(() => visibleAreaStart.value > 0);
  const canScrollRight = computed(() => visibleAreaEnd.value < scrollWidth.value);

  const updateContainerSize = () => {
    scrollWidth.value = target.value.scrollWidth;
    clientWidth.value = target.value.clientWidth;
  };

  const updateScrollPosition = () => {
    scrollPosition.value = target.value.scrollLeft;
  };

  onMounted(() => {
    target.value.addEventListener('scroll', updateScrollPosition);
    window.addEventListener('resize', updateContainerSize);

    // $nextTick is needed because vuetify adjusts the content padding after mount
    Vue.nextTick(() => {
      updateScrollPosition();
      updateContainerSize();
    });
  });

  onUnmounted(() => {
    target.value.removeEventListener('scroll', updateScrollPosition);
    window.removeEventListener('resize', updateContainerSize);
  });

  return {
    scrollPosition,
    scrollWidth,
    clientWidth,
    visibleAreaStart,
    visibleAreaEnd,
    canScrollLeft,
    canScrollRight,
  };
}

export default useScrollState;
