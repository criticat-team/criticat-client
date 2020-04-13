import { Category, CategoryEnum } from '../types';
import colors from 'vuetify/src/util/colors';
import { mdiGamepad } from '@mdi/js';

const category: Category = {
  id: CategoryEnum.games,
  icon: mdiGamepad,
  color: colors.lightGreen.darken2,
  position: 'left',
};

export default category;
