<template>
  <v-card tag="section" class="card-slider-section">
    <v-card-title class="card-slider-section__header">
      <span class="overline font-weight-medium" v-text="title" />
      <v-spacer />
      <div class="caption font-weight-medium">
        <slot name="show-more" />
      </div>
    </v-card-title>
    <div class="card-slider-section__slider">
      <slot name="slider" :show-buttons="showButtons" :outer-gap="outerGap" />
    </div>
  </v-card>
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
      outerGap: 24,
      showButtons: false,
    };
  },
};
</script>

<style lang="scss" scoped>
$distance: 12px;
.card-slider-section {
  padding-bottom: $distance - 8px;
  margin-bottom: 20px;
  &__header {
    display: flex;
    flex-direction: row;
    padding-bottom: 4px;
  }
  &__slider {
    margin-left: -$distance;
    margin-right: -$distance;
  }
}
</style>
