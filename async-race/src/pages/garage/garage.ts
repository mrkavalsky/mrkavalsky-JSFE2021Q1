import { BasePage } from '../../shared/base-page';

export class Garage extends BasePage {
  constructor() {
    super('garage');
    this.refreshCarList();
  }

  async refreshCarList(): Promise<void> {
    const cars = await this.asyncRaceApi.getGarageCars();
    this.carList.refreshCarListPage(cars);
  }
}
