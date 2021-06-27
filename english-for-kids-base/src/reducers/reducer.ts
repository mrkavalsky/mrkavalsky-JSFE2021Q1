import { combineReducers } from 'redux';
import { CHANGE_THEME, TOGGLE_MENU } from '../actions/action-types';
import { IAction, IMenuAction } from '../interfaces';
import { THEME_TRAIN } from '../components/header/classes';

const initialTheme: any = {
  value: THEME_TRAIN,
};

const themeReducer = (
  state: any = initialTheme,
  { type, payload }: IAction,
) => {
  switch (type) {
    case CHANGE_THEME:
      return { ...state, value: payload };
    default:
      return state;
  }
};

const initialMenu: any = {
  isHidden: true,
};

const menuReducer = (
  state: any = initialMenu,
  { type, payload }: IMenuAction,
) => {
  switch (type) {
    case TOGGLE_MENU:
      return { ...state, isHidden: payload };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  theme: themeReducer,
  menu: menuReducer,
});
