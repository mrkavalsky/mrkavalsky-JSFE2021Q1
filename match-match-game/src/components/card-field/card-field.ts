import { BaseBlock } from '../../shared/base-block';
import { Card } from '../card/card';
import './card-field.css';

export class CardField extends BaseBlock {
  constructor(private mode: number = 8) {
    super('div', ['card-field']);
    this.appendComponents(this.getCards());
  }

  clear(): void {
    this.children = [];
    this.element.innerHTML = '';
  }

  getCards(): Card[] {
    const cardArray: Card[] = [];
    for (let i = 0; i < this.mode; i++) {
      cardArray.push(new Card(`${i}`));
    }
    return cardArray.concat(cardArray).sort(() => Math.random() - .5);
  }

  refreshGameField(): void {
    this.clear();
    this.appendComponents(this.getCards());
  }
}
