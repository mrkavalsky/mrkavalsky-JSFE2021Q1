import { getCars } from '../../components/cars-generator';
import { GaragePageWrapper } from '../../components/garage-page-wrapper/garage-page-wrapper';
import { GarageControl } from '../../components/garage-control/garage-control';
import { RaceControl } from '../../components/race-control/race-control';
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
    this.garageControl.carControlCreate.submitButton.node.addEventListener(
      'click',
      () => this.createCar(),
    );
    this.garageControl.carControlUpdate.submitButton.node.addEventListener(
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
    this.observeRaceControlButtons();
    this.carList.setNavButtonsEnable();
  }

  async removeCar(id: number | undefined): Promise<void> {
    if (!id) return;
    this.carList.setNavButtonsDisable();
    await this.asyncRaceApi.deleteCar(id, this.pageName);
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
    await this.asyncRaceApi.postGarageCar(car);
    this.pageNumber = 0;
    await this.changePage();
  }

  async updateCar(): Promise<void> {
    if (!this.currentCar) return;
    const car: INewCar = this.garageControl.carControlUpdate.getInputValues();
    await this.asyncRaceApi.updateGarageCar(car, this.currentCar);
    this.pageNumber = 0;
    await this.changePage();
  }

  async runCar(raceControl: RaceControl): Promise<RaceControl | void> {
    const id = raceControl.getCarId();
    if (!id) return undefined;
    const time = await this.switchEngineToDriveMode(raceControl, id);
    return time;
  }

  async stopCar(raceControl: RaceControl): Promise<void> {
    const id = raceControl.getCarId();
    if (!id) return;
    await this.asyncRaceApi.stopEngine(id);
    raceControl.returnBackCar();
    raceControl.clearDelay();
  }

  async switchEngineToDriveMode(
    raceControl: RaceControl,
    id: number,
  ): Promise<RaceControl> {
    const raceTime = await this.getTime(id);
    this.asyncRaceApi.switchEngineToDriveMode(id).catch(() => {
      raceControl.stopCar();
      raceControl.clearDelay();
    });
    raceControl.setRaceTime(raceTime);
    raceControl.runCar();
    const finishedCar = await raceControl.setDelay();
    return finishedCar;
  }

  resetRace(): void {
    this.carList
      .getRaceControls()
      .forEach(({ stopButton }) => stopButton.node.click());
  }

  async startRace(): Promise<RaceControl | void> {
    const winner = await Promise.race(
      this.carList.getRaceControls().map((control) => this.runCar(control)),
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
