import categories from '@/assets/js/categories';
import pages from '@/assets/js/pages';

export default function({ app, route, redirect }) {
  const segments = route.path.split('/');
  const categorySegment = segments[1];
  const pageSegment = segments[2];

  if (pageSegment !== undefined) {
    const categoryItem = Object.values(categories).find(category => {
      return app.i18n.t(`categories.${category.id}.slug`) === categorySegment;
    });

    const pageItem = Object.values(pages).find(page => {
      return app.i18n.t(`pages.${page.id}.slug`) === pageSegment;
    });

    const compatibility =
      categoryItem !== undefined &&
      pageItem !== undefined &&
      route.meta.filter(
        meta => meta.compatibility !== undefined && !meta.compatibility.includes(categoryItem.id),
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
