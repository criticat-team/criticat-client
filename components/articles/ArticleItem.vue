<template>
  <v-card :elevation="elevation" class="article-item" tag="article" height="100%">
    <loading-overlay :active="!loaded" />
    <v-img
      class="article-item__image white--text grey lighten-2"
      :src="image"
      :aspect-ratio="16 / 9"
      gradient="to bottom, rgba(0,0,0,.6) 0%, rgba(0,0,0,.1) 20%, rgba(0,0,0,.1) 50%, rgba(0,0,0,.7)"
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
          class="article-item__image__content__title fill-height align-end white--text headline"
          :class="compact ? 'body-1' : 'headline'"
        >
          <span v-text="title" />
        </v-card-title>
      </a>
    </v-img>
    <template v-if="!compact">
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
          v-text="$t('components.articles.item.button')"
        />
      </v-card-actions>
    </template>
  </v-card>
</template>

<script>
import moment from 'moment';
import LoadingOverlay from '@/components/ui/loading/LoadingOverlay';
import LoadingLines from '@/components/ui/loading/LoadingLines';

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
    elevation: {
      mandatory: false,
      type: Number,
      default: 2,
    },
    compact: {
      mandatory: false,
      type: Boolean,
      default: false,
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
        span {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
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
