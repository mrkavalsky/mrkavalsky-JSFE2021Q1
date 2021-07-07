import { changeCurrentCard, updateCurrentCards } from '../actions/actions';
import { store } from '../reducers/core/store';
import { findCard } from './find-card';
import { finishGame } from './finish-game';
import { getUpdatedCards } from './get-updated-cards';

export const updateStatisticsState = (): void => {
  const {
    statistics: { currentCard, currentCards },
  } = store.getState();
  const newCurrentCards = getUpdatedCards(currentCards, currentCard);
  const newCurrentCard = findCard(newCurrentCards);

  updateCurrentCards(newCurrentCards);

  if (newCurrentCard) {
    changeCurrentCard(newCurrentCard);
  } else if (newCurrentCards.length !== 0) {
    finishGame();
  }
};
