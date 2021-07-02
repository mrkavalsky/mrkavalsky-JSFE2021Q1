import { store } from '../reducers/core/store';
import { IGameWord } from '../types/interfaces';
import {
  CHANGE_CURRENT_CARD,
  CHANGE_MODE,
  CHANGE_WORDS_LIST,
  GAME_STATE,
  HIT_WORD,
  MISS_WORD,
} from './action-types';

export function changeMode(newMode: string): void {
  store.dispatch({
    type: CHANGE_MODE,
    payload: newMode,
  });
}

export function changeGameMode(isGameStarted: boolean): void {
  store.dispatch({
    type: GAME_STATE,
    payload: isGameStarted,
  });
}

export function changeWordsList(
  currentCards: IGameWord[],
  currentCard: IGameWord,
): void {
  store.dispatch({
    type: CHANGE_WORDS_LIST,
    payload: {
      currentCards,
      currentCard,
    },
  });
}

export function hitWord(): void {
  store.dispatch({
    type: HIT_WORD,
    payload: {},
  });
}

export function missWord(): void {
  store.dispatch({
    type: MISS_WORD,
    payload: {},
  });
}

export function changeCurrentCard(currentCard: IGameWord): void {
  store.dispatch({
    type: CHANGE_CURRENT_CARD,
    payload: {
      currentCard,
    },
  });
}
