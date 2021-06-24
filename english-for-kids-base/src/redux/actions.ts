import { IAction } from '../interfaces';
import { CHANGE_THEME, INIT_APP } from './types';

export function changeTheme(newTheme: string): IAction {
  return {
    type: CHANGE_THEME,
    payload: newTheme,
  };
}

export function initApp(): IAction {
  return {
    type: INIT_APP,
  };
}
