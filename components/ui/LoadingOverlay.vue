<template>
  <v-overlay v-if="active" z-index="4" color="transparent" class="loading-overlay" absolute />
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@keyframes loading-overlay-animation {
  0% {
    background-position: 100% 0;
  }

  100% {
    background-position: -100% 0;
  }
}

.loading-overlay {
  overflow: hidden;
  animation-duration: 1.25s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: loading-overlay-animation;
  animation-timing-function: linear;
  background: linear-gradient(to right, transparent 8%, white 18%, transparent 33%);
  background-size: 200%;
  opacity: 0.3;
}
</style>
