import { BaseComponent } from '../base-component';
import { ICar } from '../ICar';
import { CarListPage } from '../../components/car-list-page/car-list-page';

export class BaseCarList extends BaseComponent {
  private carListPage: CarListPage = new CarListPage(this.node);

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'car-list', 'Page #1');
  }

  refreshCarListPage(cars: ICar[]): void {
    this.carListPage = new CarListPage(this.node, cars);
  }
}
