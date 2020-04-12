import movies from './movies';
import tv from './tv';
import games from './games';
import books from './books';

export type Category = {
  id: string;
  icon: string;
  color: string;
  position: CategoryPosition;
};

export enum CategoryTypesEnum {
  movies = 'movies',
  tv = 'tv',
  books = 'books',
  games = 'games',
}
export type CategoryId =
  | CategoryTypesEnum.movies
  | CategoryTypesEnum.tv
  | CategoryTypesEnum.books
  | CategoryTypesEnum.games;

export type CategoryPosition = 'top' | 'right' | 'bottom' | 'left';

export type CategoryMap = { [key in CategoryId]: Category };

export const categories: CategoryMap = {
  movies,
  tv,
  books,
  games,
};

export default categories;
