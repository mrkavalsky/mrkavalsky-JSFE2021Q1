import { BaseBlock } from "../base-block";
import { CardField } from "../card-field/card-field";
import './game.css';

export class Game extends BaseBlock {
  private cardField: CardField = new CardField();
  constructor() {
    super('div', ['game']);
    this.appendComponents([this.cardField]);
  }
}