import { BaseButton } from '../../shared/base-button/base-button';
import { BaseComponent } from '../../shared/base-component';
import { ICar } from '../../shared/ICar';
import { Car } from '../car/car';
import { RaceTrack } from '../race-track/race-track';
import './race-control.css';

export class RaceControl extends BaseComponent {
  private car = new Car(this.node);

  public readonly removeButton: BaseButton = new BaseButton(
    this.node,
    'remove',
  );

  private raceTrack = new RaceTrack(this.node);

  constructor(parentNode: HTMLElement, private carInfo: ICar) {
    super(parentNode, 'div', 'race-control', carInfo.name);
    this.car.setColor(this.carInfo.color);
  }

  getCarId(): number | undefined {
    return this.carInfo.id;
  }
}
