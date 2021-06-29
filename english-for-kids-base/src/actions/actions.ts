import { store } from '../reducers/core/store';
import { ActionTypes } from './action-types';

export function changeMode(newMode: string): void {
  store.dispatch({
    type: ActionTypes.CHANGE_MODE,
    payload: newMode,
  });
}
