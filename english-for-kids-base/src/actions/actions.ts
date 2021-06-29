import { store } from '../reducers/core/store';
import { ActionTypes } from './action-types';

export function changeMode(newMode: string): void {
  store.dispatch({
    type: ActionTypes.CHANGE_MODE,
    payload: newMode,
  });
}

export function startGame(): void {
  store.dispatch({
    type: ActionTypes.START_GAME,
  });
}

export function endGame(): void {
  store.dispatch({
    type: ActionTypes.END_GAME,
  });
}

export function resetGame(): void {
  store.dispatch({
    type: ActionTypes.RESET_GAME,
  });
}
