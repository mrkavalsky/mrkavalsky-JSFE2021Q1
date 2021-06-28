import { store } from '../reducers/core/store';
import { CHANGE_MODE } from './action-types';

export function changeMode(newMode: string): void {
  store.dispatch({
    type: CHANGE_MODE,
    payload: newMode,
  });
}
