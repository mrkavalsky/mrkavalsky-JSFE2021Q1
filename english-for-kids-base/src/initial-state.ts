import { THEME_TRAIN } from './components/header/classes';
import { MAIN_PAGE } from './components/main-page/config';

const initialState = {
  theme: {
    value: THEME_TRAIN,
  },
  menu: {
    isHidden: true,
  },
  page: {
    value: MAIN_PAGE,
  },
};

export default initialState;
