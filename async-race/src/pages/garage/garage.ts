import { getCars } from '../../components/cars-generator';
import { GaragePageWrapper } from '../../components/garage-page-wrapper/garage-page-wrapper';
import { GarageControl } from '../../components/garage-control/garage-control';
import { CarControl } from '../../components/car-control/car-control';
import { BasePage } from '../../shared/base-page';
import { ICar, INewCar } from '../../shared/car-interface';
import './garage.css';
import { BaseButton } from '../../shared/base-button/base-button';
import { Popup } from '../../components/popup/popup';
import { IWinner } from '../../shared/winner-interface';
import { IRaceSpecifications } from '../../shared/race-specifications-interface';

export class Garage extends BasePage {
  private carList: GaragePageWrapper;

  private garageControl: GarageControl = new GarageControl(this.node);

  private currentCar: number | null = null;

  private carControlButtonsArray: BaseButton[] = [];

  private countSingleRaces = 0;

  private popup: Popup = new Popup();

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
      async () => {
        await this.createCar();
        this.garageControl.carAdjustCreate.resetInputs();
      },
    );
    this.garageControl.carAdjustUpdate.submitButton.node.addEventListener(
      'click',
      async () => {
        await this.updateCar();
        this.garageControl.carAdjustUpdate.resetInputs();
      },
    );
    this.garageControl.resetButton.node.addEventListener('click', () =>
      this.resetRace(),
    );
    this.garageControl.raceButton.node.addEventListener('click', () =>
      this.runRaceCycle(),
    );
    this.popup.node.addEventListener('click', () =>
      this.garageControl.resetButton.node.click(),
    );
    this.changePage();
    this.setLastPageNumber();
  }

  async generateCars(): Promise<void> {
    this.toggleAllButtonsMode();
    const cars: INewCar[] = await getCars();
    await Promise.all(cars.map((car) => this.asyncRaceApi.postGarageCar(car)));
    this.refreshTotalCount();
    this.setLastPageNumber();
    await this.refreshCurrentPage();
    this.toggleAllButtonsMode(false);
  }

  async changePage(isForward = true): Promise<void> {
    this.toggleAllButtonsMode();
    this.setPageNumber(isForward);
    await this.refreshCurrentPage();
    this.toggleAllButtonsMode(false);
  }

  async refreshCurrentPage(): Promise<void> {
    this.currentPage = await this.asyncRaceApi.getGaragePage(
      this.pageNumber,
      this.pageLimit,
    );
    this.carList.setPageNumberTitle(this.pageNumber);
    this.carList.refreshCarListPage(this.currentPage);
    this.observeCarControlButtons();
    this.resetCountSingleRaces();
  }

  async removeCar(id: number): Promise<void> {
    this.toggleAllButtonsMode();
    await this.asyncRaceApi.deleteCar(id, this.pageName);
    this.refreshTotalCount();
    await this.refreshCurrentPage();
    this.toggleAllButtonsMode(false);
  }

  observeCarControlButtons(): void {
    this.carControlButtonsArray = [];
    this.carList.getCarControls().forEach((control) => {
      control.removeButton.node.addEventListener('click', () =>
        this.removeCar(control.getCarId()),
      );
      control.selectButton.node.addEventListener('click', () =>
        this.selectCar(control),
      );
      control.startButton.node.addEventListener('click', async () =>
        this.runSingleRace(control),
      );
      control.stopButton.node.addEventListener('click', () =>
        this.stopSingleRace(control),
      );
      this.carControlButtonsArray = this.carControlButtonsArray.concat(
        control.buttonsArray,
      );
    });
  }

  async createCar(): Promise<void> {
    this.toggleAllButtonsMode();
    const car: INewCar = this.garageControl.carAdjustCreate.getInputValues();
    await this.asyncRaceApi.postGarageCar(car);
    this.refreshTotalCount();
    await this.refreshCurrentPage();
    this.toggleAllButtonsMode(false);
  }

  async updateCar(): Promise<void> {
    if (!this.currentCar) return;
    this.toggleAllButtonsMode();
    const car: INewCar = this.garageControl.carAdjustUpdate.getInputValues();
    await this.asyncRaceApi.updateGarageCar(car, this.currentCar);
    await this.refreshCurrentPage();
    this.currentCar = null;
    this.toggleAllButtonsMode(false);
  }

  async selectCar(control: CarControl): Promise<void> {
    this.toggleAllButtonsMode();
    this.currentCar = control.getCarId();
    const car: ICar = await this.asyncRaceApi.getGarageCar(this.currentCar);
    this.garageControl.carAdjustUpdate.setInputs(car.name, car.color);
    this.toggleAllButtonsMode(false);
  }

  async runCar(carControl: CarControl): Promise<void> {
    const id = carControl.getCarId();
    const raceTime: number = await this.getTime(id);
    carControl.setRaceTime(raceTime);
  }

  async stopCar(carControl: CarControl): Promise<void> {
    const id = carControl.getCarId();
    carControl.returnBackCar();
    carControl.clearDelay();
    await this.asyncRaceApi.stopEngine(id);
  }

  async switchEngineToDriveMode(carControl: CarControl): Promise<CarControl> {
    const id = carControl.getCarId();
    this.asyncRaceApi.switchEngineToDriveMode(id).catch(() => {
      carControl.stopCar();
      carControl.clearDelay();
    });
    carControl.runCar();
    const finishedCar = await carControl.setDelay();
    return finishedCar;
  }

  async resetRace(): Promise<void> {
    this.toggleAllButtonsMode();
    await Promise.all(
      this.carList.getCarControls().map((control) => this.stopCar(control)),
    );
    this.toggleAllButtonsMode(false);
  }

  async startRace(): Promise<CarControl> {
    this.toggleAllButtonsMode();
    await Promise.all(
      this.carList.getCarControls().map((control) => this.runCar(control)),
    );
    this.garageControl.resetButton.toggleButtonMode(false);
    const winner = await Promise.race(
      this.carList
        .getCarControls()
        .map((control) => this.switchEngineToDriveMode(control)),
    );
    this.toggleAllButtonsMode(false);
    return winner;
  }

  async getTime(id: number): Promise<number> {
    const data: IRaceSpecifications = await this.asyncRaceApi.startEngine(id);
    return Math.round(data.distance / data.velocity);
  }

  async runRaceCycle(): Promise<void> {
    const winner: CarControl = await this.startRace();
    const raceTime: number = winner.getRaceTime() / 1000;
    const message = `${winner.getCarName()} is went first (${raceTime}s)`;
    this.popup.setMessage(message);
    document.body.append(this.popup.node);
    this.refreshWinnersDatabase(winner, raceTime);
  }

  async refreshWinnersDatabase(
    winner: CarControl,
    raceTime: number,
  ): Promise<void> {
    const winners: IWinner[] = await this.asyncRaceApi.getWinners();
    const winnerId: number = winner.getCarId();
    const prevWinnerResult: IWinner | undefined = winners.find(
      ({ id }) => id === winnerId,
    );
    if (prevWinnerResult) {
      await this.updateWinner(prevWinnerResult, raceTime, winnerId);
    } else {
      await this.creatWinner(winner, raceTime);
    }
  }

  async updateWinner(
    prevWinnerResult: IWinner,
    raceTime: number,
    winnerId: number,
  ): Promise<void> {
    prevWinnerResult.wins++;
    prevWinnerResult.time =
      prevWinnerResult.time < raceTime ? prevWinnerResult.time : raceTime;
    await this.asyncRaceApi.updateWinner(prevWinnerResult, winnerId);
  }

  async creatWinner(winner: CarControl, raceTime: number): Promise<void> {
    const winnerResult: IWinner = {
      id: winner.getCarId(),
      wins: 1,
      time: raceTime,
    };
    await this.asyncRaceApi.postWinner(winnerResult);
  }

  async runSingleRace(carControl: CarControl): Promise<void> {
    this.countSingleRaces++;
    this.toggleGarageControlAndNavButtons();
    carControl.toggleButtonsMode();
    await this.runCar(carControl);
    carControl.stopButton.toggleButtonMode(false);
    this.switchEngineToDriveMode(carControl);
  }

  async stopSingleRace(carControl: CarControl): Promise<void> {
    await this.stopCar(carControl);
    if (this.countSingleRaces === 1) {
      this.toggleGarageControlAndNavButtons(false);
    }
    this.countSingleRaces--;
    carControl.toggleButtonsMode(false);
  }

  toggleAllButtonsMode(isEnable = true): void {
    this.toggleGarageControlAndNavButtons(isEnable);
    this.carControlButtonsArray.forEach((button) =>
      button.toggleButtonMode(isEnable),
    );
  }

  toggleGarageControlAndNavButtons(isEnable = true): void {
    this.carList.toggleNavButtonsMode(isEnable);
    this.garageControl.toggleAllButtonsMode(isEnable);
  }

  resetCountSingleRaces(): void {
    this.countSingleRaces = 0;
  }
}
