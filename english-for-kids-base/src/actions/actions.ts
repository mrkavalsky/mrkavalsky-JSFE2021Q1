import { store } from '../reducers/core/store';
import { CHANGE_THEME } from './action-types';

export function changeTheme(newTheme: string): void {
  store.dispatch({
    type: CHANGE_THEME,
    payload: newTheme,
  });
}
