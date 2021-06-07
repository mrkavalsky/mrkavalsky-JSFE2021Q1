import { BaseComponent } from '../../shared/base-component';
import { ICar } from '../../shared/ICar';
import { CarListPage } from '../car-list-page/car-list-page';

export class CarList extends BaseComponent {
  private carListPage: CarListPage = new CarListPage(this.node);

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'car-list', 'Page #1');
  }

  refreshCarListPage(cars: ICar[]): void {
    this.carListPage = new CarListPage(this.node, cars);
  }
}
