import { getHash } from '../router/get-hash';
import { ICardInfo } from '../types/interfaces';
import { getCurrentCards } from './get-current-cards';

export const getGameWords = (): ICardInfo[] | void => {
  const cards = getCurrentCards(getHash());

  if (cards) {
    return cards.sort(() => Math.random() - 0.5);
  }

  return cards;
};
