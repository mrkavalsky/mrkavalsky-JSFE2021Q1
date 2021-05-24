import { CardField } from '../../components/card-field/card-field';
import './game-page.css';
import { BasePage } from '../../shared/base-page';
import { Stopwatch } from '../../components/stopwatch/stopwatch';

export class Game extends BasePage {
  private cardField: CardField = new CardField();

  public readonly stopwatch: Stopwatch = new Stopwatch();

  constructor() {
    super('div', ['game'], [], 'start-game');
    this.appendComponents([this.stopwatch, this.cardField]);
  }

  async startGame(): Promise<number[]> {
    this.stopwatch.reset();
    await this.cardField.refreshGameField();
    this.stopwatch.start();
    await this.checkGameEndInterval();
    this.stopwatch.stop();
    return [this.cardField.getPairs(), this.stopwatch.getTime()];
  }

  setCardType(cardTypeElement: HTMLSelectElement): void {
    this.cardField.setCardType(
      cardTypeElement.value ? cardTypeElement.value : 'cats',
    );
  }

  setDifficulty(difficultyElement: HTMLSelectElement): void {
    this.cardField.setDifficulty(
      difficultyElement.value ? +difficultyElement.value : 4,
    );
  }

  private checkGameEndInterval(): Promise<void> {
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (this.cardField.checkGameEnd()) {
          resolve();
        }
      }, 1000);
    });
  }
}
