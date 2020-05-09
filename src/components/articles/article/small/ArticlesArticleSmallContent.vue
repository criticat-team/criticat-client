<template>
  <v-card
    @click.prevent="$emit('click', $event)"
    class="d-flex fill-height"
    :href="article.url"
    target="_blank"
  >
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-img
          :aspect-ratio="16 / 9"
          :src="article.image || imagePlaceholder"
          :lazy-src="imagePlaceholder"
          cover
        >
          <v-sheet
            v-if="category"
            tile
            :color="category.color"
            class="overline white--text px-2 py-1 rounded-br"
            style="position: absolute;"
            :elevation="2"
            v-text="article.origin.title"
          />
          <v-fade-transition v-if="!isTouchScreen">
            <v-overlay opacity="0.8" v-if="hover" absolute>
              <div v-text="article.title" class="pa-2 text-center white--text"></div>
            </v-overlay>
          </v-fade-transition>
        </v-img>
      </template>
    </v-hover>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';
import store from '@/store';
import { Article } from '@/generated/graphql';
import { CategoryEnum } from '@/config/categories/types';

export default defineComponent({
  props: {
    article: Object as () => Article,
  },
  setup(props, context) {
    const isTouchScreen = context.root.$screen.touch;

    const category = computed(() =>
      props.article != null && props.article.categories != null
        ? store.state.categories[props.article.categories[0] as CategoryEnum]
        : null,
    );

    const imagePlaceholder =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN88B8AAsUB4ZtvXtIAAAAASUVORK5CYII=';

    return { category, isTouchScreen, imagePlaceholder };
  },
});
</script>
