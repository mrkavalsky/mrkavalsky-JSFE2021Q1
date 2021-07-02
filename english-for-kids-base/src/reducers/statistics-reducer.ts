import {
  CHANGE_CURRENT_CARD,
  CHANGE_WORDS_LIST,
  HIT_WORD,
  MISS_WORD,
  UPDATE_CURRENT_CARDS,
} from '../actions/action-types';
import { IStatisticsAction, IStatisticsState } from '../types/interfaces';
import initialState from './initial-state';

export const statisticsReducer = (
  state: IStatisticsState = initialState.statistics,
  { type, payload }: IStatisticsAction,
): IStatisticsState => {
  switch (type) {
    case CHANGE_WORDS_LIST:
      return {
        ...state,
        currentCards: payload.currentCards
          ? payload.currentCards
          : initialState.statistics.currentCards,
        currentCard: payload.currentCard
          ? payload.currentCard
          : initialState.statistics.currentCard,
      };
    case MISS_WORD:
      return {
        ...state,
        currentCard: { ...state.currentCard, miss: state.currentCard.miss + 1 },
      };
    case HIT_WORD:
      return { ...state, currentCard: { ...state.currentCard, isHit: true } };
    case CHANGE_CURRENT_CARD:
      return {
        ...state,
        currentCard: payload.currentCard
          ? payload.currentCard
          : initialState.statistics.currentCard,
      };
    case UPDATE_CURRENT_CARDS:
      return {
        ...state,
        currentCards: payload.currentCards
          ? payload.currentCards
          : initialState.statistics.currentCards,
      };
    default:
      return state;
  }
};
