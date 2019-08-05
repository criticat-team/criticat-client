<template>
  <div>
    <h1>Item id: {{ id }}</h1>
  </div>
</template>

<script>
export default {
  asyncData({ store }) {
    return {
      category: store.state.category,
    };
  },
};
</script>
