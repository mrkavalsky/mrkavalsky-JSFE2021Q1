import { findCard } from '../helpers/find-card';
import { getGameCards } from '../helpers/get-cards';
import { store } from '../reducers/core/store';
import { ActionTypes } from './action-types';

export function changeMode(newMode: string): void {
  store.dispatch({
    type: ActionTypes.CHANGE_MODE,
    payload: newMode,
  });
}

export function startGame(): void {
  const cards = getGameCards();
  store.dispatch({
    type: ActionTypes.START_GAME,
    cards,
    card: findCard(cards),
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

export function hitWord(): void {
  store.dispatch({
    type: ActionTypes.HIT_WORD,
  });
}

export function missWord(): void {
  store.dispatch({
    type: ActionTypes.MISS_WORD,
  });
}
