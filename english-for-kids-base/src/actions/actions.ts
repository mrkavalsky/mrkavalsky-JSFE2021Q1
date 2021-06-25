import { IAction, IMenuAction } from '../interfaces';
import { CHANGE_THEME, INIT_APP, TOGGLE_MENU } from '../redux/action-types';

export function changeTheme(newTheme: string): IAction {
  return {
    type: CHANGE_THEME,
    payload: newTheme,
  };
}

export function toggleMenu(isHidden: boolean): IMenuAction {
  return {
    type: TOGGLE_MENU,
    payload: isHidden,
  };
}

export function initApp(): IAction {
  return {
    type: INIT_APP,
  };
}
