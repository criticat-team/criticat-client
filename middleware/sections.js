import sections from '@/assets/js/sections';

export default function(ctx) {
  const segments = ctx.route.path.split('/');
  const categorySegment = segments[1];
  const sectionSegment = segments[2];
  if (sectionSegment !== undefined) {
    const section = sections[sectionSegment];
    if (section === undefined || !section.compatibility.includes(categorySegment)) {
      ctx.redirect({
        name: 'category',
        params: {
          category: categorySegment,
        },
      });
    }
  }
}
