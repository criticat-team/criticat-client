<template>
  <slider-section
    :width="280"
    :inner-gap="12"
    :card-container="cardContainer"
    title="Articles"
    :show-more-route="{ name: 'category-articles' }"
    :category="category"
  >
    <article-item
      v-for="(n, index) in nDisplayedArticles"
      :key="index"
      compact
      :elevation="cardContainer ? 4 : 2"
      :article="loadedArticles[index]"
    />
  </slider-section>
</template>

<script>
import articlesMixin from '@/components/articles/articlesMixin';
import ArticleItem from '@/components/articles/ArticleItem';
import SliderSection from '@/components/sections/slider/SliderSection';

export default {
  components: {
    ArticleItem,
    SliderSection,
  },
  mixins: [articlesMixin],
  computed: {
    cardContainer() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },
};
</script>
