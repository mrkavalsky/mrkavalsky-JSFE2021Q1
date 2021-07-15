import { cards } from '../../cards';
import { ICards } from '../types/interfaces';

function CardsControl() {
  let CARDS = cards;

  return {
    getValue() {
      return CARDS;
    },
    setValue(value: ICards[]) {
      CARDS = value;
    },
  };
}

export const CARDS = CardsControl();
