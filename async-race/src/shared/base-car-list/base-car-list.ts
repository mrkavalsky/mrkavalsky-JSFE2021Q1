import { BaseComponent } from '../base-component';

export class BaseCarList extends BaseComponent {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'car-list', 'Page #1');
  }
}
