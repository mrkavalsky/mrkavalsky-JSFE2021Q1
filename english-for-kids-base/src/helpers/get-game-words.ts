import { ICardInfo, IGameWord } from '../types/interfaces';

export const getGameWords = (
  cardLIst: void | ICardInfo[],
): IGameWord[] | void => {
  if (cardLIst) {
    return cardLIst
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

  return cardLIst;
};
