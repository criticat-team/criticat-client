<template>
  <v-card class="live-stream-item" height="100%">
    <v-img
      class="live-stream-item__image white--text grey lighten-2"
      :src="liveStream.preview.large"
      :aspect-ratio="16 / 9"
      gradient="to bottom, rgba(0,0,0,.6) 0%, rgba(0,0,0,.1) 20%, rgba(0,0,0,.1) 50%, rgba(0,0,0,.7)"
    >
      <v-card-title
        class="live-stream-item__image__title align-end white--text headline"
        :class="compact ? 'body-1' : 'headline'"
      >
        <span v-text="liveStream.game" />
      </v-card-title>
      <v-card-text class="live-stream-item__image__status white--text">
        <p v-text="liveStream.channel.status"></p>
      </v-card-text>
      <v-card-text class="live-stream-item__image__name white--text">
        <p v-text="liveStream.channel.display_name"></p>
      </v-card-text>
    </v-img>
  </v-card>
</template>

<script>
export default {
  props: {
    liveStream: {
      mandatory: true,
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      compact: true,
    };
  },
};
</script>
<style lang="scss">
.live-stream-item {
  flex-direction: column;

  &__image {
    &__name {
      position: absolute;
      padding-bottom: 8px;
      bottom: 0px;
    }
  }
}
</style>
