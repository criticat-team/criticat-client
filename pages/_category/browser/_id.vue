<template>
  <div>
    <h1>Item id: {{ id }}</h1>
  </div>
</template>

<script>
export default {
  asyncData({ params }) {
    return {
      id: params.id,
    };
  },
};
</script>
