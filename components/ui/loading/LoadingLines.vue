<template>
  <div v-if="active" class="loading-lines">
    <div v-for="line in lines" :key="line" class="loading-lines__line grey lighten-2"></div>
  </div>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false,
      required: true,
    },
    lines: {
      type: Number,
      default: 3,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.loading-lines {
  &__line {
    height: 15px;
    width: 100%;

    &:not(:first-child) {
      margin-top: 10px;
    }
  }
}
</style>
