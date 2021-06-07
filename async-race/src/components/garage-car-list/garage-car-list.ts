import { BaseCarList } from '../../shared/base-car-list/base-car-list';
import { ICar } from '../../shared/ICar';
import { GarageCarListPage } from '../garage-car-list-page/garage-car-list-page';

export class GarageCarList extends BaseCarList {
  private carListPage: GarageCarListPage = new GarageCarListPage(this.node);

  refreshCarListPage(cars: ICar[]): void {
    this.node.lastElementChild?.remove();
    this.carListPage = new GarageCarListPage(this.node, cars);
  }
}
