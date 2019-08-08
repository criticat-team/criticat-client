export default function({ params, store, redirect, app }) {
  const currentCategory = store.state.category;
  if (
    (currentCategory === null && params.category === undefined) ||
    (currentCategory !== null && params.category === currentCategory.slug)
  ) {
    return;
  }
  if (params.category !== undefined) {
    const category = store.getters.getCategoryBySlug(params.category);
    if (category) {
      store.commit('setCategory', category);
    } else {
      redirect(
        app.localePath({
          name: 'index',
        }),
      );
    }
  } else {
    store.commit('setCategory', null);
  }
}
