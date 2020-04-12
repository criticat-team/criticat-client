import { Category } from '../index';
import colors from 'vuetify/src/util/colors';
import { mdiBook } from '@mdi/js';

export const category: Category = {
  id: 'books',
  icon: mdiBook,
  color: colors.cyan.darken2,
  position: 'right',
};

export default category;
