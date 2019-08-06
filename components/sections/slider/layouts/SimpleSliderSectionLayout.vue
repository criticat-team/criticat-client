<template>
  <section class="simple-slider-section">
    <div class="simple-slider-section__header">
      <span class="subtitle-1 font-weight-medium" v-text="title" />
      <v-spacer />
      <div class="subtitle-1 font-weight-medium">
        <slot name="show-more" />
      </div>
    </div>
    <div class="simple-slider-section__slider">
      <slot name="slider" :show-buttons="showButtons" :outer-gap="outerGap" />
    </div>
  </section>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      mandatory: true,
      default: '',
    },
  },
  data() {
    return {
      outerGap: 12,
      showButtons: true,
    };
  },
};
</script>

<style lang="scss" scoped>
$distance: 12px;
.simple-slider-section {
  padding-bottom: $distance - 8px;
  margin-bottom: 20px;
  &__header {
    display: flex;
    flex-direction: row;
  }
  &__slider {
    margin-left: -$distance;
    margin-right: -$distance;
  }
}
</style>
