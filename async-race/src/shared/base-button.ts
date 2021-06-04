import { BaseComponent } from './base-component';

export class BaseButton extends BaseComponent {
  constructor(parentNode: HTMLElement, content: string) {
    super(parentNode, 'button', `${parentNode.className}__button`, content);
  }
}
