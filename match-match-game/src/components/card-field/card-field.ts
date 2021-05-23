import { BaseBlock } from '../../shared/base-block';
import { delay } from '../../shared/delay';
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

  async refreshGameField(): Promise<void> {
    this.clear();
    const cards: Card[] = this.getCards();
    this.appendComponents(cards);
    await delay(3);
    cards.forEach( (card) => {
      card.rotateToFront();
    });
    await this.waitTransitionEnd();
  }

  waitTransitionEnd(): Promise<void> {
    return new Promise((resolve) => {
      this.element.addEventListener('transitionend', () => resolve(), {once: true});
    });
  }
}
