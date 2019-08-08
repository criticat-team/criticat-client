export default function({ app, route, redirect, store }) {
  const segments = route.path.split('/');
  const categorySegment = segments[1];
  const pageSegment = segments[2];

  if (pageSegment !== undefined) {
    const categoryItem = store.getters.getCategoryBySlug(categorySegment);
    const pageItem = store.getters.getPageBySlug(pageSegment);
    const compatibility =
      categoryItem !== undefined &&
      pageItem !== undefined &&
      pageItem.compatibility.includes(categoryItem.id);

    if (!compatibility) {
      redirect(
        app.localePath({
          name: 'category',
          params: {
            category: categoryItem.slug,
          },
        }),
      );
    }
  }
}
