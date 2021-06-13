import { BaseComponent } from '../../shared/base-component';
import { ICar } from '../../shared/car-interface';
import { CarControl } from '../car-control/car-control';

export class GarageCurrentPage extends BaseComponent {
  private carArray: CarControl[] = [];

  constructor(parentNode: HTMLElement, cars: ICar[] = []) {
    super(parentNode, 'div', 'car-list__page');
    this.initGarage(cars);
  }

  addCar(carInfo: ICar): void {
    const car: CarControl = new CarControl(this.node, carInfo);
    this.carArray.push(car);
  }

  initGarage(cars: ICar[]): void {
    cars.forEach((car) => this.addCar(car));
  }

  getCarControls(): CarControl[] {
    return this.carArray;
  }
}
