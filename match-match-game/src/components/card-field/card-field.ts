import { BaseBlock } from "../base-block";
import { Card } from "../card/card";
import './card-field.css';

export class CardField extends BaseBlock {
  constructor(private mode: number = 8) {
    super('div', ['card-field']);
    for(let i = 0; i < this.mode; i++) {
      this.appendComponents([new Card(''), new Card('')]);
    }
  }
}