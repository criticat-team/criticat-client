import { Category } from '../index';
import colors from 'vuetify/src/util/colors';
import { mdiGamepad } from '@mdi/js';

const category: Category = {
  id: 'games',
  icon: mdiGamepad,
  color: colors.lightGreen.darken2,
  position: 'left',
};

export default category;
