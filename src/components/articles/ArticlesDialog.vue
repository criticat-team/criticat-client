<template>
  <div
    class="articles-dialog"
    :class="{ 'articles-dialog--fullscreen': fullscreen }"
    v-if="visible"
  >
    <v-dialog
      class="articles-dialog__dialog"
      :fullscreen="fullscreen"
      :max-width="modalWidth"
      v-model="visible"
    >
      <v-window
        class="articles-carousel"
        :class="{ 'articles-carousel--fullscreen': fullscreen }"
        :continuous="false"
        v-model="visibleArticleIndex"
        hide-delimiters
        :show-arrows="false"
      >
        <v-window-item class="articles-carousel__item" v-for="(item, index) in items" :key="index">
          <div class="fill-height">
            <articles-article-full :article="item.article" :loading="item.loading" />
          </div>
        </v-window-item>
      </v-window>
    </v-dialog>
    <template v-if="showArrows">
      <v-fade-transition>
        <v-btn
          class="articles-dialog__button articles-dialog__button--navigation"
          :style="navigatePreviousStyle"
          v-show="navigatePreviousVisible"
          fixed
          dark
          left
          icon
          @click="navigatePrevious"
        >
          <v-icon large>{{ mdiChevronLeft }}</v-icon>
        </v-btn>
      </v-fade-transition>
      <v-fade-transition>
        <v-btn
          class="articles-dialog__button articles-dialog__button--navigation"
          :style="navigateNextStyle"
          v-show="navigateNextVisible"
          fixed
          dark
          right
          icon
          @click="navigateNext"
        >
          <v-icon large>{{ mdiChevronRight }}</v-icon>
        </v-btn>
      </v-fade-transition>
    </template>
    <v-btn class="articles-dialog__button" fixed top right icon dark @click="visible = false">
      <v-icon>mdi-close</v-icon>
    </v-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed } from '@vue/composition-api';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';
import { Article } from '@/generated/graphql';
import ArticlesArticleFull from './article/full/ArticlesArticleFull.vue';
import { useKeyboard } from '@/use/keyboard';
import { Key } from 'ts-key-enum';

type Item = {
  article: Article;
  loading: boolean;
};

export default defineComponent({
  components: {
    ArticlesArticleFull,
  },
  props: {
    items: Array as () => Item[],
  },
  setup(props, context) {
    // Main logic
    const visible: Ref<boolean> = ref(false);
    const visibleArticleIndex: Ref<number> = ref(null);
    const openArticle = (index: number) => {
      visibleArticleIndex.value = index;
      visible.value = true;
    };

    // Layout
    const MODAL_WIDTH = 480;
    const fullscreen = computed(() => context.root.$vuetify.breakpoint.xs);
    const modalWidth = computed(() => (fullscreen.value ? '100%' : MODAL_WIDTH));
    const carouselHeight = computed(() => (fullscreen.value ? '100%' : '700'));

    // Arrows
    const ARROWS_WIDTH = 36;
    const ARROWS_DISTANCE_FROM_MODAL = 10;
    const showArrows = computed(() => !fullscreen.value);
    const arrowsCalcFromEdge = `calc(50% - ${
      MODAL_WIDTH / 2
    }px - ${ARROWS_DISTANCE_FROM_MODAL}px - ${ARROWS_WIDTH}px)`;
    const navigatePreviousStyle = {
      left: arrowsCalcFromEdge,
    };
    const navigateNextStyle = {
      right: arrowsCalcFromEdge,
    };

    // Navigation
    const canNavigateNext = computed(() => visibleArticleIndex.value !== props.items.length - 1);
    const canNavigatePrevious = computed(() => visibleArticleIndex.value > 0);

    const navigateNext = () => {
      if (canNavigateNext.value) {
        visibleArticleIndex.value = visibleArticleIndex.value + 1;
      }
    };
    const navigatePrevious = () => {
      if (canNavigatePrevious.value) {
        visibleArticleIndex.value = visibleArticleIndex.value - 1;
      }
    };

    useKeyboard({
      [Key.ArrowLeft]: navigatePrevious,
      [Key.ArrowRight]: navigateNext,
    });

    return {
      visible,
      visibleArticleIndex,
      modalWidth,
      openArticle,
      fullscreen,
      carouselHeight,
      showArrows,
      navigateNext,
      navigateNextStyle,
      navigateNextVisible: canNavigateNext,
      navigatePrevious,
      navigatePreviousStyle,
      navigatePreviousVisible: canNavigatePrevious,
      mdiChevronLeft,
      mdiChevronRight,
    };
  },
});
</script>
<style lang="scss">
.articles-dialog {
  &__button {
    z-index: 300;
    &--navigation {
      top: calc(50% - 20px);
    }
  }
}
.articles-carousel {
  height: 100%;
  &__item {
    height: 700px;
    max-height: 700px;
  }
  &--fullscreen {
    background: white;
    border-color: lightgray;
    .articles-carousel {
      &__item {
        height: 100%;
        max-height: 100%;
      }
    }
  }
}
</style>
