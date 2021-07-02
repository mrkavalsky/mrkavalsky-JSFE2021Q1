import { IGameWord } from '../types/interfaces';

export const getUpdatedCards = (
  currentCards: IGameWord[],
  currentCard: IGameWord,
): IGameWord[] =>
  currentCards.map((card) =>
    card.word === currentCard.word ? currentCard : card,
  );
