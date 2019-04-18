import categories from '@/assets/categories'

const categoryIds = categories.map(cat => cat.id)

export default function(ctx) {
  const category = ctx.params.category
  if (category != null && !categoryIds.includes(ctx.params.category)) {
    ctx.redirect('/')
  }
}
