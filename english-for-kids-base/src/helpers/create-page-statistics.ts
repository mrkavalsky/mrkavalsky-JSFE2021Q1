import { IStatisticsState } from '../types/interfaces';
import { findCard } from './find-card';
import { getGameWords } from './get-game-words';

export const createPageStatistics = (): null | IStatisticsState => {
  const currentCards = getGameWords();

  if (currentCards) {
    const currentCard = findCard(currentCards);

    if (currentCard) {
      return { currentCards, currentCard };
    }
  }

  return null;
};
