<template>
  <v-card flat class="d-flex" style="height: 100%;" :href="article.url" target="_blank">
    <v-hover>
      <template v-slot:default="{ hover }">
        <v-img
          :src="article.image || 'https://via.placeholder.com/256x144.png'"
          :lazy-src="'https://via.placeholder.com/256x144.png'"
          cover
        >
          <v-sheet
            :height="22"
            tile
            :color="category && category.color"
            class="overline white--text px-2 py-1"
            style="border-radius: 0 0 4px 0; position: absolute;"
            :elevation="2"
            v-text="article.origin.title"
          />
          <v-fade-transition>
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

export default defineComponent({
  props: {
    article: Object,
  },
  setup(props) {
    const category = computed(() => store.state.categories[props.article.categories[0]]);
    return { category };
  },
});
</script>
