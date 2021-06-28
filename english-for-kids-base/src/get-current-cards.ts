import { cards } from '../public/cards';
import { ICardInfo } from './interfaces';

export const getCurrentCards = (currentHash: string): ICardInfo[] | void => {
  const currentCards = cards.find(({ hash }) => hash === currentHash);

  if (!currentCards) return currentCards;
  return currentCards.cardsList;
};
