import { GarageCarList } from '../../components/garage-car-list/garage-car-list';
import { GarageControl } from '../../components/garage-control/garage-control';
import { BasePage } from '../../shared/base-page';

export class Garage extends BasePage {
  private carList: GarageCarList;

  private garageControl: GarageControl = new GarageControl(this.node);

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
