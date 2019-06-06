<template>
  <div>
    <v-card class="article-item" tag="article" height="100%">
      <v-img
        :src="usePlaceholder || article.image == null ? imagePlaceholder : article.image"
        :lazy-src="imagePlaceholder"
        :aspect-ratio="16 / 9"
      />
      <v-card-text class="article-item__text" primary-title>
        <span>{{ usePlaceholder ? '' : article.content }}</span>
      </v-card-text>
      <v-card-actions>
        <v-btn
          :style="{ visibility: usePlaceholder ? 'hidden' : 'visible' }"
          block
          :href="usePlaceholder ? '' : article.url"
          target="_blank"
          flat
          color="primary"
        >
          Read more
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    article: {
      mandatory: true,
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      // TODO: Find proper placeholder image
      imagePlaceholder: 'https://www.floyd.org/PublishingImages/article-placeholder.jpg',
    };
  },
  computed: {
    usePlaceholder() {
      return this.article === null;
    },
  },
};
</script>

<style lang="stylus">
.article-item {
  display: flex;
  flex-direction: column;

  &__text {
    background: -webkit-linear-gradient(black 50%, rgba(0, 0, 0, 0));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    height: 160px;
    overflow-wrap: break-word;
  }
}
</style>
