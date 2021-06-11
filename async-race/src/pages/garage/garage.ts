import { getCars } from '../../components/cars-generator';
import { GarageCarList } from '../../components/garage-car-list/garage-car-list';
import { GarageControl } from '../../components/garage-control/garage-control';
import { RaceControl } from '../../components/race-control/race-control';
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
    this.garageControl.carControlCreate.submitButton.node.addEventListener(
      'click',
      () => this.createCar(),
    );
    this.garageControl.carControlUpdate.submitButton.node.addEventListener(
      'click',
      () => this.updateCar(),
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
      control.startButton.node.addEventListener('click', () =>
        this.runCar(control),
      );
      control.stopButton.node.addEventListener('click', () =>
        this.stopCar(control),
      );
    });
  }

  async createCar(): Promise<void> {
    const car = this.garageControl.carControlCreate.getInputValues();
    await this.asyncRaceApi.postCar(car);
    this.pageNumber = 0;
    await this.changePage();
  }

  async updateCar(): Promise<void> {
    if (!this.currentCar) return;
    const car = this.garageControl.carControlUpdate.getInputValues();
    car.id = this.currentCar;
    await this.asyncRaceApi.updateCar(car);
    this.pageNumber = 0;
    await this.changePage();
  }

  async runCar(raceControl: RaceControl): Promise<void> {
    const id = raceControl.getCarId();
    if (!id) return;
    const data = await this.asyncRaceApi.startEngine(id);
    const time = data.distance / data.velocity / 1000;
    raceControl.runCar(`${time}s`);
    await this.switchEngineToDriveMode(raceControl);
  }

  async stopCar(raceControl: RaceControl): Promise<void> {
    const id = raceControl.getCarId();
    if (!id) return;
    await this.asyncRaceApi.stopEngine(id);
    raceControl.returnBackCar();
  }

  async switchEngineToDriveMode(raceControl: RaceControl): Promise<void> {
    const id = raceControl.getCarId();
    if (!id) return;
    this.asyncRaceApi
      .switchEngineToDriveMode(id)
      .catch(() => raceControl.stopCar());
  }
}
