import { ICardInfo, IStatisticsState } from '../types/interfaces';
import { findCard } from './find-card';
import { getGameWords } from './get-game-words';

export const createPageStatistics = (
  cardLIst: void | ICardInfo[],
): null | IStatisticsState => {
  const currentCards = getGameWords(cardLIst);

  if (currentCards) {
    const currentCard = findCard(currentCards);

    if (currentCard) {
      return { currentCards, currentCard };
    }
  }

  return null;
};
