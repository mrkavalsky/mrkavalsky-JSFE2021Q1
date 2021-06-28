import { CHANGE_THEME } from '../actions/action-types';
import initialState from './initial-state';
import { IAction } from '../types/interfaces';

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
