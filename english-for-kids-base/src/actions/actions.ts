import { store } from '../reducers/core/store';
import { CHANGE_MODE, GAME_STATE, HIT_WORD, MISS_WORD } from './action-types';

export function changeMode(newMode: string): void {
  store.dispatch({
    type: CHANGE_MODE,
    payload: newMode,
  });
}

export function startGame(cards: any, card: any): void {
  store.dispatch({
    type: GAME_STATE,
    payload: {
      isGameStarted: true,
      cards,
      card,
    },
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
