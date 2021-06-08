import { BaseButton } from '../base-button/base-button';
import { BaseComponent } from '../base-component';

export class BaseCarList extends BaseComponent {
  public readonly prevPage: BaseButton = new BaseButton(this.node, 'prev');

  public readonly nextPage: BaseButton = new BaseButton(this.node, 'next');

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'car-list', 'Page #1');
  }
}
