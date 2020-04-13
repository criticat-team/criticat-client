export type Category = {
  id: CategoryEnum;
  icon: string;
  color: string;
  position: CategoryPosition;
};

export enum CategoryEnum {
  movies = 'movies',
  tv = 'tv',
  books = 'books',
  games = 'games',
}

export type CategoryPosition = 'top' | 'right' | 'bottom' | 'left';

export type CategoryMap = { [key in CategoryEnum]: Category };
