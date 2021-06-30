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

export function startGame(cards: any, card: any): void {
  store.dispatch({
    type: START_GAME,
    payload: {
      cards,
      card,
    }
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
