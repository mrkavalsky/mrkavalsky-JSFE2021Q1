import { findCard } from '../components/game/find-card';
import { getGameCards } from '../components/game/get-cards';
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
