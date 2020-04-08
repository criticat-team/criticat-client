import { categories } from '@/config/categories';

export const initialize = (cache) => {
  cache.writeData({
    data: {
      categories: Object.values(categories).map((category) => ({
        __typename: 'Category',
        id: category.id,
        icon: category.icon,
        color: category.color,
      })),
    },
  });
};
