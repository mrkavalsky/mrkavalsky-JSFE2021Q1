import { BaseBlock } from './base-block';
import { BaseComponent } from './base-component';

export class BasePage extends BaseBlock {
  constructor(
    tag: keyof HTMLElementTagNameMap = 'div',
    styles: string[] = [],
    children: BaseComponent[] = [],
    public name: string,
  ) {
    super(tag, styles, children);
  }
}
