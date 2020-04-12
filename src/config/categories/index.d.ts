export type Category = {
  id: string;
  icon: string;
  color: string;
  position: CategoryPosition;
};

export type CategoryId = 'movies' | 'tv' | 'books' | 'games';
export type CategoryPosition = 'top' | 'right' | 'bottom' | 'left';
