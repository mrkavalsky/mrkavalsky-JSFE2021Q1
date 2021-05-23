import { BaseBlock } from '../../shared/base-block';
import { Card } from '../card/card';
import './card-field.css';

export class CardField extends BaseBlock {
  constructor(private mode: number = 8, private category: string = 'cats') {
    super('div', ['card-field']);
  }

  clear(): void {
    this.children = [];
    this.element.innerHTML = '';
  }

  getCards(): Card[] {
    const cardArray: Card[] = [];
    for (let i = 0; i < this.mode; i++) {
      cardArray.push(new Card(`/images/${this.category}/${i}.png`));
      cardArray.push(new Card(`/images/${this.category}/${i}.png`));
    }
    return cardArray.sort(() => Math.random() - 0.5);
  }

  refreshGameField(): void {
    this.clear();
    const cards: Card[] = this.getCards();
    this.appendComponents(cards);
    setTimeout(() => {
      cards.forEach((card) => {
        card.rotateToFront();
      })
    }, 3000);
  }
}
