import { store } from '../redux/store';
import { CHANGE_THEME, INIT_APP, TOGGLE_MENU } from './action-types';

export function changeTheme(newTheme: string): void {
  store.dispatch({
    type: CHANGE_THEME,
    payload: newTheme,
  });
}

export function toggleMenu(isHidden: boolean): void {
  store.dispatch({
    type: TOGGLE_MENU,
    payload: isHidden,
  });
}

export function initApp(): void {
  store.dispatch({
    type: INIT_APP,
  });
}
