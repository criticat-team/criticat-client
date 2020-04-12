import { Category } from '../index';
import colors from 'vuetify/src/util/colors';
import { mdiTelevision } from '@mdi/js';

const category: Category = {
  id: 'tv',
  icon: mdiTelevision,
  color: colors.orange.darken3,
  position: 'bottom',
};

export default category;
