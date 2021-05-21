import { CardField } from "../../components/card-field/card-field";
import './game-page.css';
import { BasePage } from "../../shared/base-page";

export class Game extends BasePage {
  private cardField: CardField = new CardField();
  constructor() {
    super('div', ['game'], [], 'game');
    this.appendComponents([this.cardField]);
  }
}