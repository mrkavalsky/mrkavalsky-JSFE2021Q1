import { BaseComponent } from '../../shared/base-component';
import { CarListPage } from '../car-list-page/car-list-page';

export class CarList extends BaseComponent {
  private startPage: CarListPage = new CarListPage(this.node);

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'car-list', 'Page #1');
  }
}
