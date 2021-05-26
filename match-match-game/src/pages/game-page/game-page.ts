import { CardField } from '../../components/card-field/card-field';
import './game-page.css';
import { BasePage } from '../../shared/base-page';
import { Stopwatch } from '../../components/stopwatch/stopwatch';
import { BaseComponent } from '../../shared/base-component';

export class Game extends BasePage {
  private cardField: CardField = new CardField();

  public readonly stopwatch: Stopwatch = new Stopwatch();

  private gameInterval: NodeJS.Timeout | null = null;

  private isGameStart = false;
  
  private cap: BaseComponent = new BaseComponent('div', ['game__cap']);

  constructor() {
    super('div', ['game'], [], 'start-game');
    this.appendComponents([this.cap]);
    this.appendComponents([this.stopwatch, this.cardField]);
  }

  async startGame(): Promise<void> {
    this.isGameStart = true;
    this.handleClickEvent();
    this.stopwatch.reset();
    await this.cardField.refreshGameField();
    if (!this.isGameStart) return;
    this.stopwatch.start();
    await this.waitGameEnd();
    this.stopGame();
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

  private waitGameEnd(): Promise<void> {
    return new Promise((resolve) => {
      this.gameInterval = setInterval(() => {
        if (this.cardField.checkGameEnd()) {
          resolve();
        }
      }, 1000);
    });
  }

  stopGame(): number[] {
    this.isGameStart = false;
    this.handleClickEvent();
    if (this.gameInterval) {
      this.stopwatch.stop();
      clearInterval(this.gameInterval);
      this.gameInterval = null;
    }
    return [this.cardField.getPairs(), this.stopwatch.getTime()];
  }

  handleClickEvent(): void {
    this.cap.element.classList.toggle('game__cap_top', !this.isGameStart);
  }
}
