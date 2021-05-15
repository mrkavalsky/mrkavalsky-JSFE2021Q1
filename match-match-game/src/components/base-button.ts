import { BaseComponent } from './base-component';

export class BaseButton extends BaseComponent {
  constructor(
    tag: keyof HTMLElementTagNameMap = 'div',
    styles: string[] = [],
    innerText = '',
  ) {
    super(tag, styles);
    this.element.innerText = innerText;
  }
}
