import { BaseComponent } from './base-component';

export class BaseButton extends BaseComponent {
  constructor(node: HTMLElement, content: string) {
    super(node, 'button', `${node.className}__button`, content);
  }
}
