<template>
  <v-card tile dark height="100%" class="d-flex flex-column">
    <div>
      <v-img
        :aspect-ratio="16 / 9"
        :src="article.image || imagePlaceholder"
        :lazy-src="imagePlaceholder"
      ></v-img>
    </div>
    <v-card-subtitle class="pb-0 d-flex align-center">
      <v-img class="mr-3" max-height="16" max-width="16" :src="article.origin.iconUrl" />
      <span class="flex-grow-1 caption">{{ article.origin.title }}</span>
    </v-card-subtitle>
    <v-card-title>{{ article.title }}</v-card-title>
    <v-card-text class="mb-4 pb-0 flex-grow-1 overflow-y-hidden article-dialog-item__text">
      {{ article.content }}
    </v-card-text>
    <v-spacer />

    <v-card-actions>
      <v-btn :href="article.url" target="_blank" :color="category.color" block>
        Open article
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api';
import { Article } from '@/generated/graphql';
import store from '@/store';
import { CategoryEnum } from '@/config/categories/types';

export default defineComponent({
  props: {
    article: Object as () => Article,
  },
  setup(props) {
    const category = computed(() =>
      props.article != null && props.article.categories != null
        ? store.state.categories[props.article.categories[0] as CategoryEnum]
        : null,
    );

    const imagePlaceholder =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN88B8AAsUB4ZtvXtIAAAAASUVORK5CYII=';

    return { category, imagePlaceholder };
  },
});
</script>

<style lang="scss">
.article-dialog-item {
  &__text {
    background: -webkit-linear-gradient(white, transparent);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
