import { CardField } from '../../components/card-field/card-field';
import './game-page.css';
import { BasePage } from '../../shared/base-page';

export class Game extends BasePage {
  private cardField: CardField = new CardField();

  constructor() {
    super('div', ['game'], [], 'start-game');
    this.appendComponents([this.cardField]);
  }

  startGame(): void {
    this.cardField.refreshGameField();
  }
}
