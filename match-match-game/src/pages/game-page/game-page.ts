import { CardField } from '../../components/card-field/card-field';
import './game-page.css';
import { BasePage } from '../../shared/base-page';
import { Stopwatch } from '../../components/stopwatch/stopwatch';

export class Game extends BasePage {
  private cardField: CardField = new CardField();

  private stopwatch: Stopwatch = new Stopwatch();

  constructor() {
    super('div', ['game'], [], 'start-game');
    this.appendComponents([this.stopwatch, this.cardField]);
  }

  async startGame(): Promise<void> {
    this.stopwatch.stop();
    await this.cardField.refreshGameField();
    this.stopwatch.start();
  }
}
