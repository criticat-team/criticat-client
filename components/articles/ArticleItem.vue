<template>
  <v-card class="article-item" tag="article" height="100%">
    <a :href="url" target="_blank">
      <v-img
        v-if="image || !loaded"
        class="hidden-sm-and-up"
        :src="image"
        :aspect-ratio="16 / 9"
        style="background-color: #e3e3e3;"
      ></v-img>
      <v-img
        class="hidden-xs-only"
        :src="image"
        :aspect-ratio="16 / 9"
        style="background-color: #e3e3e3;"
      ></v-img>
    </a>
    <v-card-actions>
      <v-btn flat small color="grey" target="_blank" :href="originUrl">
        <v-img height="16" width="16" max-width="16" :src="originImg"></v-img>
        <span class="ml-2">{{ origin }}</span>
      </v-btn>
      <v-spacer />
      <span class="grey--text pr-2">{{ publishedAt }}</span>
    </v-card-actions>
    <v-card-text class="article-item__content">
      <div class="article-item__content__overlay"></div>
      <div class="article-item__content__title">
        <a :href="url" target="_blank" class="title">{{ title }}</a>
      </div>
      <p class="article-item__content__text">{{ content }}</p>
    </v-card-text>
    <v-card-actions>
      <v-btn
        :style="{ visibility: loaded ? 'visible' : 'hidden' }"
        block
        :href="url"
        target="_blank"
        flat
        color="primary"
      >
        Continua llegint
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    article: {
      mandatory: true,
      type: Object,
      default: null,
    },
  },
  computed: {
    loaded() {
      return this.article !== null;
    },
    image() {
      return this.loaded && this.article.image ? this.article.image : '';
    },
    title() {
      return this.loaded ? this.article.title : '';
    },
    origin() {
      return this.loaded ? this.article.origin.title : '';
    },
    content() {
      return this.loaded ? this.article.content : '';
    },
    url() {
      return this.loaded ? this.article.url : '';
    },
    publishedAt() {
      return this.loaded ? moment.unix(this.article.published).fromNow() : '';
    },
    originImg() {
      return this.loaded ? this.article.origin.iconUrl : '';
    },
    originUrl() {
      return this.loaded ? this.article.origin.htmlUrl : '';
    },
  },
};
</script>

<style lang="stylus">
.article-item {
  display: flex;
  flex-direction: column;

  &__content {
    height: 220px;
    padding-top: 0;
    overflow: hidden;

    &__title {
      align-items: flex-start;
      overflow: hidden;

      a {
        text-decoration: none;
      }
    }

    &__text {
      margin-top: 10px;
    }

    &__overlay {
      position: absolute;
      pointer-events: none;
      background: linear-gradient(rgba(0, 0, 0, 0) 70%, white);
      width: calc(100% - 32px);
      height: 220px;
    }
  }
}
</style>
