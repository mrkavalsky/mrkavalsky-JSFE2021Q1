import { IGameWord } from '../types/interfaces';

export const getUpdatedCards = (
  currentCards: IGameWord[],
  { word, isHit, train, miss }: IGameWord,
): IGameWord[] => {
  const cards = [...currentCards];
  const card = cards.find((e) => e.word === word);

  if (card) {
    card.isHit = isHit;
    card.miss = miss;
    card.train = train;
  }

  return cards;
};
