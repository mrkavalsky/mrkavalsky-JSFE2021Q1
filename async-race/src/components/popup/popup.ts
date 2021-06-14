import { BaseButton } from '../../shared/base-button/base-button';
import { BaseComponent } from '../../shared/base-component';
import './popup.css';

export class Popup extends BaseComponent {
  private popup: BaseComponent = new BaseComponent(this.node, 'div', 'popup');

  private messageField: BaseComponent = new BaseComponent(
    this.popup.node,
    'div',
    'popup__message-field',
  );

  private background: BaseComponent = new BaseComponent(
    this.node,
    'div',
    'background',
  );

  public readonly confirmButton: BaseButton = new BaseButton(
    this.popup.node,
    'ok',
  );

  constructor() {
    super(null, 'div', 'popup-wrapper');
    this.confirmButton.node.addEventListener('click', () =>
      document.body.lastElementChild?.remove(),
    );
    this.background.node.addEventListener('click', () =>
      document.body.lastElementChild?.remove(),
    );
  }

  setMessage(message: string): void {
    this.messageField.node.innerText = message;
  }
}
