import { CHANGE_WORDS_LIST } from '../actions/action-types';
import { IStatisticAction, IStatisticState } from '../types/interfaces';
import initialState from './initial-state';

export const statisticReducer = (
  state: IStatisticState = initialState.statistic,
  { type, payload }: IStatisticAction,
): IStatisticState => {
  switch (type) {
    case CHANGE_WORDS_LIST:
      return {
        ...state,
        currentCards: payload.currentCards ? payload.currentCards : [],
        currentCard: payload.currentCard,
      };
    default:
      return state;
  }
};
