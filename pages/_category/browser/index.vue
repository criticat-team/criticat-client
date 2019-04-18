<template>
  <div>
    <h1>Browsing in {{ category }}</h1>
    <v-btn
      v-for="category in categories"
      :key="category.id"
      color="primary"
      flat
      nuxt
      :to="{ name: 'category-browser', params: { category: category.id } }"
    >
      {{ category.title }}
    </v-btn>
  </div>
</template>

<script>
import categories from '@/assets/categories'

export default {
  data() {
    return {
      categories: categories
    }
  },
  asyncData({ params }) {
    return {
      category: params.category
    }
  }
}
</script>
