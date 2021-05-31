import { BaseBlock } from '../../shared/base-block';
import { BaseComponent } from '../../shared/base-component';
import './card.css';

export class Card extends BaseBlock {
  public isFind = false;

  private card: BaseBlock = new BaseBlock(
    'div',
    ['card', 'card_rotate'],
    [
      new BaseComponent('div', ['card__side', 'card__side_result']),
      new BaseComponent('div', ['card__side', 'card__side_back']),
      new BaseComponent('div', ['card__side', 'card__side_front']),
    ],
  );

  constructor(public path: string, difficulty = 4) {
    super('div', ['card-container']);
    if (difficulty === 6) this.element.classList.add('card-container_diff-6');
    if (difficulty === 8) this.element.classList.add('card-container_diff-8');
    this.card.children[1].element.style.background = `center / contain no-repeat url(${this.path})`;
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

  showCorrect(): Promise<void> {
    return new Promise((resolve) => {
      this.card.children[0].element.addEventListener(
        'transitionend',
        () => resolve(),
        { once: true },
      );
      this.card.children[0].element.classList.add(
        'card__side_background-green',
      );
      this.isFind = true;
    });
  }

  showError(): Promise<void> {
    return new Promise((resolve) => {
      this.card.children[0].element.addEventListener(
        'transitionend',
        () => {
          this.card.children[0].element.addEventListener(
            'transitionend',
            () => resolve(),
            {
              once: true,
            },
          );
          this.card.children[0].element.classList.remove(
            'card__side_background-red',
          );
        },
        {
          once: true,
        },
      );
      this.card.children[0].element.classList.add('card__side_background-red');
    });
  }
}
