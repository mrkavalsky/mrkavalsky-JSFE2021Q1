import { store } from '../redux/store';
import { CHANGE_PAGE, CHANGE_THEME, TOGGLE_MENU } from './action-types';

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

export function changePage(category: string): void {
  store.dispatch({
    type: CHANGE_PAGE,
    payload: category,
  });
}
