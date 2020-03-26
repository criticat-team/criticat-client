<template>
  <div>
    <no-ssr>
      <section>
        <articles-slider />
      </section>
      <section>
        <live-streams-list class="floating-container floating-container--right" />
      </section>
    </no-ssr>
  </div>
</template>

<script>
import ArticlesSlider from '@/components/articles/ArticlesSlider';
import LiveStreamsList from '@/components/live-streams/LiveStreamsList';

export default {
  name: 'Index',
  components: {
    ArticlesSlider,
    LiveStreamsList,
  },
};
</script>
<style scoped>
.floating-container {
  width: 300px;
  height: auto;
}
</style>
