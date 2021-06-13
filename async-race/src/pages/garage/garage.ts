import { getCars } from '../../components/cars-generator';
import { GaragePageWrapper } from '../../components/garage-page-wrapper/garage-page-wrapper';
import { GarageControl } from '../../components/garage-control/garage-control';
import { CarControl } from '../../components/car-control/car-control';
import { BasePage } from '../../shared/base-page';
import { INewCar } from '../../shared/car-interface';
import './garage.css';

export class Garage extends BasePage {
  private carList: GaragePageWrapper;

  private garageControl: GarageControl = new GarageControl(this.node);

  private currentCar: number | undefined = undefined;

  constructor() {
    super('garage');
    this.pageLimit = 7;
    this.carList = new GaragePageWrapper(this.node);
    this.garageControl.generateCarsButton.node.addEventListener('click', () =>
      this.generateCars(),
    );
    this.carList.nextPage.node.addEventListener('click', () =>
      this.changePage(),
    );
    this.carList.prevPage.node.addEventListener('click', () =>
      this.changePage(false),
    );
    this.garageControl.carAdjustCreate.submitButton.node.addEventListener(
      'click',
      () => this.createCar(),
    );
    this.garageControl.carAdjustUpdate.submitButton.node.addEventListener(
      'click',
      () => this.updateCar(),
    );
    this.garageControl.resetButton.node.addEventListener('click', () =>
      this.resetRace(),
    );
    this.garageControl.raceButton.node.addEventListener('click', () =>
      this.runRaceCycle(),
    );
    this.changePage();
    this.setLastPageNumber();
  }

  async generateCars(): Promise<void> {
    this.carList.setNavButtonsDisable();
    const cars = await getCars();
    cars.forEach(async (car) => this.asyncRaceApi.postGarageCar(car));
    this.refreshTotalCount();
    this.setLastPageNumber();
    this.pageNumber = 0;
    await this.changePage();
    this.carList.setNavButtonsEnable();
  }

  async changePage(isForward = true): Promise<void> {
    this.carList.setNavButtonsDisable();
    await super.changePage(isForward);
    this.currentPage = await this.asyncRaceApi.getGaragePage(
      this.pageNumber,
      this.pageLimit,
    );
    this.carList.setPageNumberTitle(this.pageNumber);
    this.carList.refreshCarListPage(this.currentPage);
    this.observeCarControlButtons();
    this.carList.setNavButtonsEnable();
  }

  async removeCar(id: number): Promise<void> {
    this.carList.setNavButtonsDisable();
    await this.asyncRaceApi.deleteCar(id, this.pageName);
    this.pageNumber = 0;
    await this.changePage();
    this.carList.setNavButtonsEnable();
  }

  observeCarControlButtons(): void {
    this.carList.getCarControls().forEach((control) => {
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
    const car = this.garageControl.carAdjustCreate.getInputValues();
    await this.asyncRaceApi.postGarageCar(car);
    this.pageNumber = 0;
    await this.changePage();
  }

  async updateCar(): Promise<void> {
    if (!this.currentCar) return;
    const car: INewCar = this.garageControl.carAdjustUpdate.getInputValues();
    await this.asyncRaceApi.updateGarageCar(car, this.currentCar);
    this.pageNumber = 0;
    await this.changePage();
  }

  async runCar(CarControl: CarControl): Promise<CarControl> {
    const id = CarControl.getCarId();
    const time = await this.switchEngineToDriveMode(CarControl, id);
    return time;
  }

  async stopCar(CarControl: CarControl): Promise<void> {
    const id = CarControl.getCarId();
    await this.asyncRaceApi.stopEngine(id);
    CarControl.returnBackCar();
    CarControl.clearDelay();
  }

  async switchEngineToDriveMode(
    CarControl: CarControl,
    id: number,
  ): Promise<CarControl> {
    const raceTime = await this.getTime(id);
    this.asyncRaceApi.switchEngineToDriveMode(id).catch(() => {
      CarControl.stopCar();
      CarControl.clearDelay();
    });
    CarControl.setRaceTime(raceTime);
    CarControl.runCar();
    const finishedCar = await CarControl.setDelay();
    return finishedCar;
  }

  resetRace(): void {
    this.carList
      .getCarControls()
      .forEach(({ stopButton }) => stopButton.node.click());
  }

  async startRace(): Promise<CarControl | void> {
    const winner = await Promise.race(
      this.carList.getCarControls().map((control) => this.runCar(control)),
    );
    return winner;
  }

  async getTime(id: number): Promise<number> {
    const data = await this.asyncRaceApi.startEngine(id);
    return Math.round(data.distance / data.velocity);
  }

  async runRaceCycle(): Promise<void> {
    const winner = await this.startRace();
    if (!winner) return;
    const winners = await this.asyncRaceApi.getWinners();
    // if (winners.find(({ id }) => id === winner.getCarId())) {
    //   this.asyncRaceApi.updateCar(winner.getCarInfo(), 'winners');
    // } else {
    //   this.asyncRaceApi.postCar(winner.getCarInfo(), 'winners');
    // }
  }
}
