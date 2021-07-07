import { renderCategoryPage } from '..';
import { cards } from '../../../../public/cards';
import { ICardInfo, IStatisticsCard } from '../../../types/interfaces';
import { ASC_SORT } from '../../statistics-page/config';
import { sortDatabase } from '../../statistics-page/helpers/sort-database';
import { BASE_CARD } from './config';

function getDifficultCards(): ICardInfo[] {
  const database = sortDatabase('errors', ASC_SORT);
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

export const renderDifficultWordsPage = (): Element => {
  const difficultCards = getDifficultCards();
  const page = renderCategoryPage(difficultCards);

  return page;
};
