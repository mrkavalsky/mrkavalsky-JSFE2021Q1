import { BaseComponent } from '../base-component';

export class BaseCarList extends BaseComponent {
  public readonly prevPage: BaseComponent = new BaseComponent(
    this.node,
    'button',
    'button',
    'prev',
  );

  public readonly nextPage: BaseComponent = new BaseComponent(
    this.node,
    'button',
    'button',
    'next',
  );

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'car-list', 'Page #1');
  }
}
