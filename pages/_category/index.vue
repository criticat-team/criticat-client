<template>
  <div>
    <h1>{{ category }} home</h1>
  </div>
</template>

<script>
export default {
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
