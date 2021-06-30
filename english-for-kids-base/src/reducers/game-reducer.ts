import { GAME_STATE, HIT_WORD, MISS_WORD } from '../actions/action-types';
import initialState from './initial-state';

export const gameReducer = (
  state: any = initialState.game,
  { type, payload }: any,
): any => {
  switch (type) {
    case GAME_STATE:
      return {
        ...state,
        isGameStarted: payload.isGameStarted,
        currentCards: payload.cards,
        currentCard: payload.card,
      };
    case HIT_WORD:
      return { ...state, currentCard: { ...state.currentCard, hit: 1 } };
    case MISS_WORD:
      return {
        ...state,
        currentCard: { ...state.currentCard, miss: state.currentCard.miss + 1 },
      };
    default:
      return state;
  }
};
