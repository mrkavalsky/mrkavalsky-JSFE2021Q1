import { BaseBlock } from '../../shared/base-block';
import { delay } from '../../shared/delay';
import { Card } from '../card/card';
import './card-field.css';

export class CardField extends BaseBlock {
  private activeCard: Card | null = null;

  private isActiveCard = false;

  private allPairs = 0;

  private correctPairs = 0;

  constructor(private cardType = 'cats', private difficulty = 4) {
    super('div', ['card-field']);
    this.allPairs = this.difficulty ** 2 / 2;
  }

  clear(): void {
    this.children = [];
    this.element.innerHTML = '';
    this.correctPairs = 0;
  }

  getCards(): Card[] {
    const cardArray: Card[] = [];
    for (let i = 0; i < this.allPairs; i++) {
      cardArray.push(
        new Card(`/images/${this.cardType}/${i}.png`, this.difficulty),
      );
      cardArray.push(
        new Card(`/images/${this.cardType}/${i}.png`, this.difficulty),
      );
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
    if (this.isActiveCard) return;
    if (card.isFind) return;
    if (card === this.activeCard) return;
    if (!this.activeCard) {
      this.activeCard = card;
      await card.rotateToBack();
      return;
    }
    this.isActiveCard = true;
    await card.rotateToBack();
    if (this.activeCard.path === card.path) {
      this.correctPairs++;
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

  setCardType(cardType: string): void {
    this.cardType = cardType;
  }

  setDifficulty(difficulty: number): void {
    this.difficulty = difficulty;
    this.allPairs = this.difficulty ** 2 / 2;
  }

  checkGameEnd(): boolean {
    return this.allPairs === this.correctPairs;
  }

  getPairs(): number {
    return this.correctPairs;
  }
}
