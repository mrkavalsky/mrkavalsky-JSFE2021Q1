import { ICardInfo } from '../types/interfaces';

export const findCard = (cards: ICardInfo[]): ICardInfo | undefined => {
  return cards.find(({ hit }) => hit === 0);
};
