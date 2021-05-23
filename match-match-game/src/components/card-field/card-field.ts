import { BaseBlock } from '../../shared/base-block';
import { delay } from '../../shared/delay';
import { Card } from '../card/card';
import './card-field.css';

export class CardField extends BaseBlock {
  private activeCard: Card | null = null;

  private isActiveCard = false;

  private isAnimationBegin = false;

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
    cards.forEach((card) => {
      card.rotateToFront();
    });
    await this.waitTransitionEnd();
    cards.forEach((card) => {
      card.element.addEventListener('click', () => {
        this.cardHandler(card);
      });
    });
  }

  waitTransitionEnd(): Promise<void> {
    return new Promise((resolve) => {
      this.element.addEventListener('transitionend', () => resolve(), {
        once: true,
      });
    });
  }

  async cardHandler(card: Card): Promise<void> {
    if (card.isFind) return;
    if (card === this.activeCard) return;
    if (this.isActiveCard) return;
    await card.rotateToBack();
    if (!this.activeCard) {
      this.activeCard = card;
      return;
    }
    this.isActiveCard = true;
    if (this.activeCard.path === card.path) {
      await Promise.all([this.activeCard.showCorrect(), card.showCorrect()]);
    } else {
      await Promise.all([this.activeCard.showError(), card.showError()]);
      await Promise.all([
        this.activeCard.rotateToFront(),
        card.rotateToFront(),
      ]);
    }
    this.activeCard = null;
    this.isActiveCard = false;
  }
}
