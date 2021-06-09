import { getCars } from '../../components/cars-generator';
import { GarageCarList } from '../../components/garage-car-list/garage-car-list';
import { GarageControl } from '../../components/garage-control/garage-control';
import { BasePage } from '../../shared/base-page';
import './garage.css';

export class Garage extends BasePage {
  private carList: GarageCarList;

  private garageControl: GarageControl = new GarageControl(this.node);

  private currentCar: number | undefined = undefined;

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
    this.changePage();
    this.setLastPageNumber();
  }

  async generateCars(): Promise<void> {
    this.carList.setNavButtonsDisable();
    const cars = await getCars();
    cars.forEach(async (car) => this.asyncRaceApi.postCar(car));
    this.refreshTotalCount();
    this.setLastPageNumber();
    this.pageNumber = 0;
    await this.changePage();
    this.carList.setNavButtonsEnable();
  }

  async changePage(isForward = true): Promise<void> {
    this.carList.setNavButtonsDisable();
    await super.changePage(isForward);
    this.carList.setPageNumberTitle(this.pageNumber);
    this.carList.refreshCarListPage(this.currentPage);
    this.observeRaceControlButtons();
    this.carList.setNavButtonsEnable();
  }

  async removeCar(id: number | undefined): Promise<void> {
    if (!id) return;
    this.carList.setNavButtonsDisable();
    await this.asyncRaceApi.deleteCar(id);
    this.pageNumber = 0;
    await this.changePage();
    this.carList.setNavButtonsEnable();
  }

  observeRaceControlButtons(): void {
    this.carList.getRaceControls().forEach((control) => {
      control.removeButton.node.addEventListener('click', () =>
        this.removeCar(control.getCarId()),
      );
      control.selectButton.node.addEventListener('click', () => {
        this.currentCar = control.getCarId();
      });
    });
  }
}
