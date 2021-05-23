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

  rotateToBack(): Promise<void> {
    return this.rotate();
  }

  rotateToFront(): Promise<void> {
    return this.rotate(false);
  }

  rotate(isFront = true): Promise<void> {
    return new Promise((resolve) => {
      this.card.element.classList.toggle('card_rotate', isFront);
      this.card.element.addEventListener('transitionend', () => resolve(), {
        once: true,
      });
    });
  }
}
