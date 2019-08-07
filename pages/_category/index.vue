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
  name: 'CategoryIndex',
  components: {
    ArticlesSlider,
  },
  asyncData({ store }) {
    return {
      category: store.state.category,
    };
  },
};
</script>
