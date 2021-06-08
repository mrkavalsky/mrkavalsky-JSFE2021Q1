import { BaseComponent } from '../base-component';
import './base-button.css';

export class BaseButton extends BaseComponent {
  constructor(parentNode: HTMLElement, content: string) {
    super(parentNode, 'button', 'button', content);
  }

  setDisable(): void {
    this.node.classList.add('button_disable');
  }

  setEnable(): void {
    this.node.classList.remove('button_disable');
  }
}
