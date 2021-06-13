import { BaseCarList } from '../../shared/base-car-list/base-car-list';
import { ICar } from '../../shared/car-interface';
import { GarageCurrentPage } from '../garage-current-page/garage-current-page';
import { RaceControl } from '../race-control/race-control';

export class GarageCarList extends BaseCarList {
  private carListPage: GarageCurrentPage = new GarageCurrentPage(this.node);

  refreshCarListPage(cars: ICar[]): void {
    this.node.lastElementChild?.remove();
    this.carListPage = new GarageCurrentPage(this.node, cars);
  }

  getRaceControls(): RaceControl[] {
    return this.carListPage.getRaceControls();
  }
}
