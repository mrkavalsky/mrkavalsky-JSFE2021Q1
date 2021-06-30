import { findCard } from '../helpers/find-card';
import { getGameCards } from '../helpers/get-cards';
import { store } from '../reducers/core/store';
import {
  CHANGE_MODE,
  END_GAME,
  HIT_WORD,
  MISS_WORD,
  RESET_GAME,
  START_GAME,
} from './action-types';

export function changeMode(newMode: string): void {
  store.dispatch({
    type: CHANGE_MODE,
    payload: newMode,
  });
}

export function startGame(): void {
  const cards = getGameCards();
  store.dispatch({
    type: START_GAME,
    cards,
    card: findCard(cards),
  });
}

export function endGame(): void {
  store.dispatch({
    type: END_GAME,
  });
}

export function resetGame(): void {
  store.dispatch({
    type: RESET_GAME,
  });
}

export function hitWord(): void {
  store.dispatch({
    type: HIT_WORD,
  });
}

export function missWord(): void {
  store.dispatch({
    type: MISS_WORD,
  });
}
