import { BaseComponent } from '../../shared/base-component';
import { ICar } from '../../shared/ICar';
import { RaceControl } from '../race-control/race-control';

export class GarageCarListPage extends BaseComponent {
  private carArray: RaceControl[] = [];

  constructor(parentNode: HTMLElement, cars: ICar[] = []) {
    super(parentNode, 'div', 'car-list__page');
    this.initGarage(cars);
  }

  addCar(carInfo: ICar): void {
    const car: RaceControl = new RaceControl(this.node, carInfo);
    this.carArray.push(car);
  }

  initGarage(cars: ICar[]): void {
    cars.forEach((car) => this.addCar(car));
  }
}
