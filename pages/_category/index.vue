<template>
  <div>
    <no-ssr>
      <section>
        <articles-slider :category="category" />
      </section>
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
  asyncData({ store }) {
    return {
      category: store.state.category,
    };
  },
};
</script>
