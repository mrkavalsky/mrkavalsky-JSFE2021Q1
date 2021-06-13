import { BaseComponent } from '../base-component';
import './base-button.css';

export class BaseButton extends BaseComponent {
  constructor(parentNode: HTMLElement, content: string) {
    super(parentNode, 'button', 'button', content);
  }

  toggleButtonMode(isEnable = true): void {
    this.node.classList.toggle('button_disable', isEnable);
  }
}
