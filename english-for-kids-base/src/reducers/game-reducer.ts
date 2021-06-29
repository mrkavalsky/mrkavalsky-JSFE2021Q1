import { ActionTypes } from '../actions/action-types';
import initialState from './initial-state';

export const gameReducer = (
  state: any = initialState.game,
  { type, cards, card }: any,
): any => {
  switch (type) {
    case ActionTypes.START_GAME:
      return {
        ...state,
        value: ActionTypes.START_GAME,
        currentCards: cards,
        currentCard: card,
      };
    case ActionTypes.END_GAME:
      return { ...state, value: ActionTypes.END_GAME };
    case ActionTypes.RESET_GAME:
      return { ...state, value: ActionTypes.RESET_GAME };
    default:
      return state;
  }
};
