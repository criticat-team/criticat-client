<template>
  <polygon
    class="app-logo-item"
    :class="classes"
    @click="$emit('click', $event)"
    :points="points"
    :fill="active ? color : 'rgba(255, 255, 255, 0.16)'"
  >
  </polygon>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';
export type Position = 'top' | 'right' | 'bottom' | 'left' | 'center';

export default defineComponent({
  props: {
    active: Boolean,
    position: String as () => Position,
    color: String as () => Position,
  },
  setup(props, context) {
    const points = computed(() => {
      switch (props.position) {
        case 'center':
          return '104,104 104,196 196,196 196,104';
        case 'top':
          return '10,0 100,90 200,90 290,0';
        case 'right':
          return '300,290 210,200 210,100 300,10';
        case 'bottom':
          return '10,300 100,210 200,210 290,300';
        case 'left':
          return '0,10 90,100 90,200 0,290';
      }
    });

    const classes = computed(() => ({
      [`app-logo-item--${props.position}`]: true,
      'app-logo-item--clickable': context.listeners.click != null,
    }));

    return { points, classes };
  },
});
</script>

<style lang="scss" scoped>
.app-logo-item {
  transition: fill 0.28s map-get($transition, 'ease-in-out');

  &--clickable {
    cursor: pointer;
  }
  &--top,
  &--right,
  &--bottom,
  &--left {
    // animation: bouncedelay 0.6s infinite ease-in-out both;
  }
  &--top {
    animation-delay: 0;
  }
  &--right {
    animation-delay: 0.15s;
  }
  &--bottom {
    animation-delay: 0.3s;
  }
  &--left {
    animation-delay: 0.45s;
  }
  &--center {
    animation-delay: 0.45s;
  }
}
@keyframes bouncedelay {
  0%,
  100% {
  }

  40%,
  60% {
    fill: #565656;
  }
}
</style>
