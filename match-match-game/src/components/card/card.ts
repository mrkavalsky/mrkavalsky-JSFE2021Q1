import { BaseBlock } from '../../shared/base-block';
import { BaseComponent } from '../../shared/base-component';
import './card.css';

export class Card extends BaseBlock {
  public card: BaseBlock = new BaseBlock(
    'div',
    ['card', 'card_rotate'],
    [
      new BaseComponent('div', ['card__side', 'card__side_back']),
      new BaseComponent('div', ['card__side', 'card__side_front']),
    ],
  );

  constructor(path: string) {
    super('div', ['card-container']);
    this.card.children[0].element.style.background = `center / contain no-repeat url(${path})`;
    this.appendComponents([this.card]);
  }

  rotateToBack(): void {
    this.card.element.classList.add('card_rotate');
  }

  rotateToFront(): void {
    this.card.element.classList.remove('card_rotate');
  }
}
