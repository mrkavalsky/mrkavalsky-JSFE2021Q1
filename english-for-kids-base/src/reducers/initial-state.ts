import { Theme } from '../components/header/classes';
import { MAIN_PAGE } from '../components/main-page/config';

const initialState = {
  theme: {
    value: Theme.THEME_TRAIN,
  },
  page: {
    value: MAIN_PAGE,
  },
};

export default initialState;
