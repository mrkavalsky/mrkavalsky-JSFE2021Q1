import { BasePageWrapper } from '../../shared/base-page-wrapper/base-page-wrapper';
import { ICar } from '../../shared/car-interface';
import { GarageCurrentPage } from '../garage-current-page/garage-current-page';
import { CarControl } from '../car-control/car-control';

export class GaragePageWrapper extends BasePageWrapper {
  private carListPage: GarageCurrentPage = new GarageCurrentPage(this.node);

  refreshCarListPage(cars: ICar[]): void {
    this.node.lastElementChild?.remove();
    this.carListPage = new GarageCurrentPage(this.node, cars);
  }

  getCarControls(): CarControl[] {
    return this.carListPage.getCarControls();
  }
}
