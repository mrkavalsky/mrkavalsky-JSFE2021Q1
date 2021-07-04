import { updateCurrentCards } from '../actions/actions';
import { store } from '../reducers/core/store';

export const updateTrainField = (word: string): void => {
  const {
    statistics: { currentCards },
  } = store.getState();
  const newCurrentCards = currentCards.map((card) =>
    card.word === word ? { ...card, train: card.train + 1 } : card,
  );

  updateCurrentCards(newCurrentCards);
};
