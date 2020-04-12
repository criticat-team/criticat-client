import { Category } from '../index';
import colors from 'vuetify/src/util/colors';
import { mdiMovie } from '@mdi/js';

const category: Category = {
  id: 'movies',
  icon: mdiMovie,
  color: colors.red.base,
  position: 'top',
};

export default category;
