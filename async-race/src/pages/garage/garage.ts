import { getCars } from '../../components/cars-generator';
import { GarageCarList } from '../../components/garage-car-list/garage-car-list';
import { GarageControl } from '../../components/garage-control/garage-control';
import { BasePage } from '../../shared/base-page';

export class Garage extends BasePage {
  private carList: GarageCarList;

  private garageControl: GarageControl = new GarageControl(this.node);

  constructor() {
    super('garage');
    this.pageLimit = 7;
    this.carList = new GarageCarList(this.node);
    this.garageControl.generateCarsButton.node.addEventListener('click', () =>
      this.generateCars(),
    );
    this.carList.nextPage.node.addEventListener('click', () =>
      this.changePage(),
    );
    this.carList.prevPage.node.addEventListener('click', () =>
      this.changePage(false),
    );
    this.refreshCarList();
    this.changePage();
    this.setLastPageNumber();
  }

  async refreshCarList(): Promise<void> {
    const cars = await this.asyncRaceApi.getGarageCars();
    this.carList.refreshCarListPage(cars);
  }

  async generateCars(): Promise<void> {
    const cars = await getCars();
    cars.forEach(async (car) => this.asyncRaceApi.postCar(car));
    this.refreshTotalCount();
    this.setLastPageNumber();
    this.refreshCarList();
  }

  async changePage(isForward = true): Promise<void> {
    this.setPageNumber(isForward);
    const page = await this.asyncRaceApi.getPage(
      this.pageName,
      this.pageNumber,
      this.pageLimit,
    );
    this.carList.refreshCarListPage(page);
  }
}
