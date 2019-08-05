<template>
  <div>
    <no-ssr>
      <section>
        <articles-slider />
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
};
</script>
