import { getHash } from '../router/get-hash';
import { IGameWord } from '../types/interfaces';
import { getCurrentCards } from './get-current-cards';

export const getGameWords = (): IGameWord[] | void => {
  const cards = getCurrentCards(getHash());

  if (cards) {
    return cards
      .map(({ word, audioSrc, train, miss }) => {
        return {
          word,
          audioSrc,
          train,
          isHit: false,
          miss,
        };
      })
      .sort(() => Math.random() - 0.5);
  }

  return cards;
};
