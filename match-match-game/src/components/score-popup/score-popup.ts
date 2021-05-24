import { BaseBlock } from '../../shared/base-block';
import { BaseComponent } from '../../shared/base-component';
import { NavButton } from '../../shared/nav-button';
import './score-popup.css';

export class ScorePopup extends BaseBlock {
  private background: BaseComponent = new BaseComponent('div', [
    'score-popup__background',
  ]);

  private popup: BaseBlock = new BaseBlock('div', ['score-popup__popup']);

  private messageField: BaseComponent = new BaseComponent('div', [
    'score-pop__message-field',
  ]);

  public readonly confirmButton: NavButton = new NavButton(
    ['score-popup__button'],
    'best score',
  );

  private message = 'Congratulations! You successfully found all matches on ';

  constructor() {
    super('div', ['score-popup', 'score-popup__hidden']);
    this.confirmButton.element.innerText = 'Ok';
    this.confirmButton.element.addEventListener('click', () =>
      this.element.classList.add('score-popup__hidden'),
    );
    this.background.element.addEventListener('click', () =>
      this.confirmButton.element.click(),
    );
    this.popup.appendComponents([this.messageField, this.confirmButton]);
    this.appendComponents([this.background, this.popup]);
  }

  showMessage(time: string): void {
    this.messageField.element.innerText =
      time[0] === '0'
        ? `${this.message + time} seconds`
        : `${this.message + time} minutes`;
  }

  showPopup(time: string):void {
    this.showMessage(time);
    this.element.classList.remove('score-popup__hidden');
  }
}
