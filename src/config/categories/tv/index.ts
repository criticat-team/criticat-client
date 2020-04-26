import { Category, CategoryEnum } from '../types';
import colors from 'vuetify/src/util/colors';
import { mdiTelevision } from '@mdi/js';

const category: Category = {
  id: CategoryEnum.tv,
  icon: mdiTelevision,
  color: colors.orange.darken3,
  position: 'bottom',
};

export default category;
