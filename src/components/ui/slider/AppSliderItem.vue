<template>
  <li class="app-slider-item pa-2">
    <slot />
  </li>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {},
  components: {},
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.app-slider-item {
  list-style-type: none;
  &:first-child {
    border-left: solid 8px transparent;
  }
  &:last-child {
    border-right: solid 8px transparent;
  }
}
</style>
