import { store } from '../redux/store';
import { CHANGE_PAGE, CHANGE_THEME } from './action-types';

export function changeTheme(newTheme: string): void {
  store.dispatch({
    type: CHANGE_THEME,
    payload: newTheme,
  });
}

export function changePage(hash: string): void {
  store.dispatch({
    type: CHANGE_PAGE,
    payload: hash,
  });
}
