import { hitWord, missWord } from '../actions/actions';
import { store } from '../reducers/core/store';
import { updateStatisticsState } from './update-statistics-state';

export const compareWords = (currentWord: string, playerWord: string): void => {
  if (currentWord === playerWord) {
    hitWord();

    const {
      statistics: { currentCard, currentCards },
    } = store.getState();

    updateStatisticsState(currentCards, currentCard);
  } else {
    missWord();
  }
};
