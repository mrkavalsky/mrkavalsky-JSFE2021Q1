import { getCars } from '../../components/cars-generator';
import { GarageCarList } from '../../components/garage-car-list/garage-car-list';
import { GarageControl } from '../../components/garage-control/garage-control';
import { BasePage } from '../../shared/base-page';

export class Garage extends BasePage {
  private carList: GarageCarList;

  private garageControl: GarageControl = new GarageControl(this.node);

  constructor() {
    super('garage');
    this.carList = new GarageCarList(this.node);
    this.garageControl.generateCarsButton.node.addEventListener('click', () =>
      this.generateCars(),
    );
    this.refreshCarList();
  }

  async refreshCarList(): Promise<void> {
    const cars = await this.asyncRaceApi.getGarageCars();
    this.carList.refreshCarListPage(cars);
  }

  async generateCars(): Promise<void> {
    const cars = await getCars();
    cars.forEach(async (car) => this.asyncRaceApi.postCar(car));
    this.refreshTotalCount();
    this.refreshCarList();
  }
}
