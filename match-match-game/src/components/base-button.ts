import { BaseComponent } from './base-component';

export class BaseButton extends BaseComponent {
  constructor(styles: string[] = [], public innerText: string = '') {
    super('button', styles);
    this.element.innerText = innerText;
  }
}
