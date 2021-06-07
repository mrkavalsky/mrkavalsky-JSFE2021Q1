import { GarageCarList } from '../../components/garage-car-list/garage-car-list';
import { BasePage } from '../../shared/base-page';

export class Garage extends BasePage {
  private carList: GarageCarList;

  constructor() {
    super('garage');
    this.carList = new GarageCarList(this.node);
    this.refreshCarList();
  }

  async refreshCarList(): Promise<void> {
    const cars = await this.asyncRaceApi.getGarageCars();
    this.carList.refreshCarListPage(cars);
  }
}
