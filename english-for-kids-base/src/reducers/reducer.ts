import { CHANGE_THEME, TOGGLE_MENU } from '../actions/action-types';
import { IAction, IMenuAction } from '../interfaces';
import { THEME_TRAIN } from '../components/header/classes';

const initialTheme: any = {
  value: THEME_TRAIN,
};

export const themeReducer = (
  state: any = initialTheme,
  { type, payload }: IAction,
): any => {
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

export const menuReducer = (
  state: any = initialMenu,
  { type, payload }: IMenuAction,
): any => {
  switch (type) {
    case TOGGLE_MENU:
      return { ...state, isHidden: payload };
    default:
      return state;
  }
};
