import categories from '@/assets/js/categories';

export default function({ params, store, redirect, app }) {
  if (params.category) {
    const category = Object.values(categories).find(cat => {
      return app.i18n.t(`categories.${cat.id}.slug`) === params.category;
    });
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
