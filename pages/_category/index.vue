<template>
  <div>
    <no-ssr>
      <section>
        <articles-slider :category="category" />
      </section>
      <section v-if="category == 'games'" style="max-width: 250px">
        <live-streams-list />
      </section>
    </no-ssr>
  </div>
</template>

<script>
import ArticlesSlider from '@/components/articles/ArticlesSlider';
import LiveStreamsList from '@/components/live-streams/LiveStreamsList';

export default {
  name: 'CategoryIndex',
  components: {
    ArticlesSlider,
    LiveStreamsList,
  },
  asyncData({ store }) {
    return {
      category: store.state.category,
    };
  },
};
</script>
