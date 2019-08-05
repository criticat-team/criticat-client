import categories from '@/assets/js/categories';

export default function({ app, route, redirect, store }) {
  const segments = route.path.split('/');
  const categorySegment = segments[1];
  const sectionSegment = segments[2];

  if (sectionSegment !== undefined) {
    const category = Object.values(categories).find(cat => {
      return app.i18n.t(`categories.${cat.id}.route`) === categorySegment;
    });
    const compatibility =
      route.meta.filter(
        meta => meta.compatibility !== undefined && !meta.compatibility.includes(category.id),
      ).length === 0;

    if (!compatibility) {
      redirect(
        app.localePath({
          name: 'category',
          params: {
            category: categorySegment,
          },
        }),
      );
    }
  }
}
