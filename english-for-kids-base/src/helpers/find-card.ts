import { IGameWord } from '../types/interfaces';

export const findCard = (cards: IGameWord[]): IGameWord | undefined =>
  cards.find(({ isHit }) => !isHit);
