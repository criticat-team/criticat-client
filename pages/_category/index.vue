<template>
  <div>
    <h1>{{ category }} home</h1>
    <v-btn color="primary" flat nuxt :to="{ name: 'category-browser' }">Go to browser</v-btn>
  </div>
</template>

<script>
export default {
  asyncData({ params }) {
    return {
      category: params.category,
    };
  },
};
</script>
