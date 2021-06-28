import { cards } from '../public/cards';
import { ICardInfo } from './interfaces';

export const getCurrentCards = (currentHash: string): ICardInfo[] | void => {
  const currentCards = cards.find(({ hash }) => hash === currentHash);

  return currentCards?.cardsList;
};
