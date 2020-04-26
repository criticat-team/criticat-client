<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <div class="app-slider">
        <ul ref="itemsContainerRef" class="app-slider__items pa-0">
          <slot />
        </ul>
        <app-slider-buttons v-if="showButtons" :hover="hover" />
      </div>
    </template>
  </v-hover>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from '@vue/composition-api';
import AppSliderButtons from './AppSliderButtons.vue';

export default defineComponent({
  props: {},
  components: {
    AppSliderButtons,
  },
  setup(props, context) {
    const showButtons = !context.root.$screen.touch;

    const itemsContainerRef: Ref<HTMLElement> = ref(null);
    const resetScroll = () => {
      itemsContainerRef.value.scrollLeft = 0;
    };

    return {
      showButtons,
      resetScroll,
      itemsContainerRef,
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
}
</style>
