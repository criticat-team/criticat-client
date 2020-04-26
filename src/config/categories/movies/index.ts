import { Category, CategoryEnum } from '../types';
import colors from 'vuetify/src/util/colors';
import { mdiMovie } from '@mdi/js';

const category: Category = {
  id: CategoryEnum.movies,
  icon: mdiMovie,
  color: colors.red.base,
  position: 'top',
};

export default category;
