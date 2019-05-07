import categories from '@/assets/js/categories';

export default function(ctx) {
  const category = ctx.params.category;
  ctx.store.commit('setCategory', ctx.params.category);
  if (category !== undefined && categories[category] === undefined) {
    ctx.redirect('/');
  }
}
