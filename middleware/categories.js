import categories from '@/assets/js/categories';

const categoryIds = categories.map(cat => cat.id);

export default function(ctx) {
  const category = ctx.params.category;
  if (category !== undefined && !categoryIds.includes(category)) {
    ctx.redirect('/');
  }
}
