import { BaseBlock } from '../../shared/base-block';
import { BaseComponent } from '../../shared/base-component';
import './card.css';

export class Card extends BaseBlock {
  public card: BaseBlock = new BaseBlock(
    'div',
    ['card'],
    [
      new BaseComponent('div', ['card__side', 'card__side_back']),
      new BaseComponent('div', ['card__side', 'card__side_front']),
    ],
  );

  constructor(path: string) {
    super('div', ['card-container']);
    this.appendComponents([this.card]);
  }
}
