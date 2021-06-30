import { getHash } from '../router/get-hash';
import { ICardInfo } from '../types/interfaces';
import { getCurrentCards } from './get-current-cards';

export const getGameCards = (): ICardInfo[] | void => {
  const cards = getCurrentCards(getHash());

  if (!cards) {
    return cards;
  }

  return cards.sort(() => Math.random() - 0.5);
};
