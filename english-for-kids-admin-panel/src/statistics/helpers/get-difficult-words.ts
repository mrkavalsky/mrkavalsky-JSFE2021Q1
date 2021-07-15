import { cards } from '../../../cards';
import { ICardInfo, IStatisticsCard } from '../../types/interfaces';
import { ASC_SORT, BASE_CARD, DIFFICULT_WORDS } from '../config';
import { sortStatistics } from './sort-database';

export function getDifficultWords(): ICardInfo[] {
  const database = sortStatistics(DIFFICULT_WORDS, ASC_SORT);
  const words = database.slice(0, 8).filter(({ errors }) => errors > 0);
  const difficultCards = words.map(({ category, word }: IStatisticsCard) => {
    const currentCategory = cards.find((elem) => elem.category === category);
    const currentCard = currentCategory?.cardsList.find(
      (card) => card.word === word,
    );

    return currentCard || BASE_CARD;
  });

  return difficultCards;
}
