import {
  CHANGE_PAGE,
  CHANGE_THEME,
  TOGGLE_MENU,
} from '../actions/action-types';
import initialState from '../initial-state';
import { IAction, IMenuAction } from '../interfaces';

export const themeReducer = (
  state: any = initialState.theme,
  { type, payload }: IAction,
): any => {
  switch (type) {
    case CHANGE_THEME:
      return { ...state, value: payload };
    default:
      return state;
  }
};

export const menuReducer = (
  state: any = initialState.menu,
  { type, payload }: IMenuAction,
): any => {
  switch (type) {
    case TOGGLE_MENU:
      return { ...state, isHidden: payload };
    default:
      return state;
  }
};

export const pageReducer = (
  state: any = initialState.page,
  { type, payload }: IAction,
): any => {
  switch (type) {
    case CHANGE_PAGE:
      return { ...state, value: payload };
    default:
      return state;
  }
};
