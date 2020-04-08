<template>
  <v-card :img="article.image" min-width="300" max-width="300">
    <v-img class="white--text align-end" height="200px">
      <v-card-title>{{ article.title }}</v-card-title>
    </v-img>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    article: Object,
  },
});
</script>
