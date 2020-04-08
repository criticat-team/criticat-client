<template>
  <v-app>
    <v-navigation-drawer permanent app dark>
      <v-list>
        <v-list-item :to="{ name: 'home' }" exact>
          Home
        </v-list-item>
        <v-list-item
          v-for="category in categories"
          :key="category.id"
          :to="{ name: 'category.home', params: { categoryId: category.id } }"
        >
          {{ category.id }}
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="primary" dark></v-app-bar>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, watch, computed } from '@vue/composition-api';
import { useQuery, useMutation, useResult } from '@vue/apollo-composable';
import { categoriesQuery } from '@/state/queries';
import { setCurrentCategoryMutation } from '@/state/mutations';
import useCurrentCategory from '@/composables/use-current-category';

export default defineComponent({
  name: 'App',
  setup(props, context) {
    const { result: categoriesResult } = useQuery(categoriesQuery);
    const categories = useResult(categoriesResult);
    const { mutate: setCurrentCategory } = useMutation(setCurrentCategoryMutation, {
      optimisticResponse: true,
    });
    const currentCategoryId = computed(() => context.root.$route.params.categoryId);

    // TODO: The following lines can be removed if lazy === true. It should behave the same way
    console.log('before');
    setCurrentCategory({ id: currentCategoryId.value });
    console.log('after');
    watch(
      currentCategoryId,
      (categoryId) => {
        console.log('before');
        setCurrentCategory({ id: categoryId });
        console.log('after');
      },
      { lazy: true },
    );

    const { category: currentCategory } = useCurrentCategory();
    watch(currentCategory, (currentCategory) => {
      context.root.$vuetify.theme.currentTheme.primary = currentCategory
        ? currentCategory.color
        : '#333333';
    });
    return { categories };
  },
});
</script>
