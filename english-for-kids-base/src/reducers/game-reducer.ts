import {
  START_GAME,
  END_GAME,
  RESET_GAME,
  HIT_WORD,
  MISS_WORD,
} from '../actions/action-types';
import initialState from './initial-state';

export const gameReducer = (
  state: any = initialState.game,
  { type, cards, card }: any,
): any => {
  switch (type) {
    case START_GAME:
      return {
        ...state,
        value: START_GAME,
        currentCards: cards,
        currentCard: card,
      };
    case END_GAME:
      return { ...state, value: END_GAME };
    case RESET_GAME:
      return { ...state, value: RESET_GAME };
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
