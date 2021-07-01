import {
  CHANGE_WORDS_LIST,
  HIT_WORD,
  MISS_WORD,
} from '../actions/action-types';
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
        currentCards: payload.currentCards
          ? payload.currentCards
          : initialState.statistic.currentCards,
        currentCard: payload.currentCard
          ? payload.currentCard
          : initialState.statistic.currentCard,
      };
    case MISS_WORD:
      return {
        ...state,
        currentCard: { ...state.currentCard, miss: state.currentCard.miss + 1 },
      };
    case HIT_WORD:
      return { ...state, currentCard: { ...state.currentCard, isHit: true } };
    default:
      return state;
  }
};
