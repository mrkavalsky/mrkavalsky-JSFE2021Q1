import { cards } from '../public/cards';
import { ICardInfo } from './interfaces';

export const getCurrentCards = (
  currentCategory: string,
): ICardInfo[] | void => {
  const currentCards = cards.find(
    ({ category }) => category === currentCategory,
  );

  if (!currentCards) return currentCards;
  return currentCards.cardsList;
};
