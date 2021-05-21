import { BaseBlock } from '../shared/base-block';
import { BaseComponent } from './base-component';

export class BasePage extends BaseBlock {
  constructor(
    tag = 'div',
    styles: string[] = [],
    children: BaseComponent[] = [],
    public name: string,
  ) {
    super(tag, styles, children);
  }
}
