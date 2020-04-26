import { Category, CategoryEnum } from '../types';
import colors from 'vuetify/src/util/colors';
import { mdiBook } from '@mdi/js';

const category: Category = {
  id: CategoryEnum.books,
  icon: mdiBook,
  color: colors.cyan.darken2,
  position: 'right',
};

export default category;
