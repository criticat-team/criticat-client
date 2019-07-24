<template>
  <v-card class="article-item" tag="article" height="100%">
    <loading-overlay :active="!loaded" />
    <v-img
      class="article-item__image white--text primary"
      :src="image"
      :aspect-ratio="16 / 9"
      gradient="to bottom, rgba(0,0,0,.4) 0%, rgba(0,0,0,.1) 20%, rgba(0,0,0,.1) 50%, rgba(0,0,0,.5)"
    >
      <a class="article-item__image__content" :href="url" target="_blank">
        <v-card-actions style="position: absolute; width: 100%">
          <v-layout row>
            <v-flex tag="span" class="white--text overline" grow shrink v-text="origin" />
            <v-spacer />
            <v-flex
              tag="span"
              class="white--text text-no-wrap overline"
              shrink
              v-text="publishedAt"
            />
          </v-layout>
        </v-card-actions>
        <v-card-title
          class="article-item__image__content__title fill-height align-end white--text"
          v-text="title"
        />
      </a>
    </v-img>
    <v-card-text class="article-item__content">
      <loading-lines :active="!loaded" :lines="10" />
      <div class="article-item__content__overlay"></div>
      <p class="article-item__content__text" v-text="content"></p>
    </v-card-text>
    <v-card-actions>
      <v-btn
        :style="{ visibility: loaded ? 'visible' : 'hidden' }"
        block
        :href="url"
        target="_blank"
        text
        color="primary"
      >
        Continua llegint
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import moment from 'moment';
import LoadingOverlay from '@/components/ui/LoadingOverlay';
import LoadingLines from '@/components/ui/LoadingLines';

export default {
  components: {
    LoadingOverlay,
    LoadingLines,
  },
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

<style lang="scss">
.article-item {
  flex-direction: column;

  &__image {
    &__content {
      text-decoration: none;
      &__title {
        padding-top: 32px;
      }
    }
  }

  &__content {
    height: 160px;
    overflow: hidden;

    &__overlay {
      position: absolute;
      pointer-events: none;
      background: linear-gradient(transparent 70%, white);
      width: calc(100% - 32px);
      height: 144px;
    }
  }
}
</style>
