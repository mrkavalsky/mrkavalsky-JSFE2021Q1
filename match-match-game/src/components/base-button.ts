import { BaseComponent } from './base-component';

export class BaseButton extends BaseComponent {
  constructor(
    tag: keyof HTMLElementTagNameMap = 'div',
    styles: string[] = [],
    public innerText: string = '',
  ) {
    super(tag, styles);
    this.element.innerText = innerText;
  }
}
