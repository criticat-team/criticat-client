<template>
  <div>
    <no-ssr>
      <articles-slider :category="category" />
    </no-ssr>
  </div>
</template>

<script>
import ArticlesSlider from '@/components/articles/ArticlesSlider';

export default {
  components: {
    ArticlesSlider,
  },
  data() {
    return {
      category: undefined,
    };
  },
  asyncData({ params }) {
    return {
      category: params.category,
    };
  },
};
</script>
