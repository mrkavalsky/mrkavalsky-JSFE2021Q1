import { BaseBlock } from "../../components/base-block";
import { CardField } from "../../components/card-field/card-field";
import './game-page.css';

export class Game extends BaseBlock {
  private cardField: CardField = new CardField();
  constructor() {
    super('div', ['game']);
    this.appendComponents([this.cardField]);
  }
}