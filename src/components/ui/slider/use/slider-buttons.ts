import { Ref } from '@vue/composition-api';
import VueScrollTo from 'vue-scrollto';
import useScrollState from '@/use/scroll-state';

export function useSliderButtons(container: Ref<HTMLElement>) {
  const {
    clientWidth,
    visibleAreaStart,
    visibleAreaEnd,
    canScrollLeft,
    canScrollRight,
  } = useScrollState(container);

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
      container: container.value,
      offset,
      x: true,
      y: false,
    });
  };

  const getItems = (): HTMLElement[] => {
    return [...container.value.children] as HTMLElement[];
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
    showRightButton: canScrollRight,
    showLeftButton: canScrollLeft,
    navigateNext,
    navigatePrevious,
  };
}
