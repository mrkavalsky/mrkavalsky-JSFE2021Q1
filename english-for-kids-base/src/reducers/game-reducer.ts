import { GAME_STATE, HIT_WORD, MISS_WORD } from '../actions/action-types';
import { IGameAction, IGameState } from '../types/interfaces';
import initialState from './initial-state';

export const gameReducer = (
  state: IGameState = initialState.game,
  { type, payload }: IGameAction,
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
        currentCard: {
          ...state.currentCard,
          miss: state.currentCard ? state.currentCard.miss + 1 : 1,
        },
      };
    default:
      return state;
  }
};
