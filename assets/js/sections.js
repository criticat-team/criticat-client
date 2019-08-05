import categories from '@/assets/js/categories';

export default {
  home: {
    id: 'home',
    title: 'Home',
    icon: 'home',
    routeName: 'category',
    compatibility: [
      categories.movies.id,
      categories.tv.id,
      categories.books.id,
      categories.games.id,
    ],
  },
  browser: {
    id: 'browser',
    title: 'Browser',
    icon: 'list',
    routeName: 'category-browser',
    compatibility: [categories.movies.id, categories.tv.id],
  },
  articles: {
    id: 'articles',
    title: 'Articles',
    icon: 'art_track',
    routeName: 'category-articles',
    compatibility: [
      categories.movies.id,
      categories.tv.id,
      categories.books.id,
      categories.games.id,
    ],
  },
};
