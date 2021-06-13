import { BaseButton } from '../../shared/base-button/base-button';
import { BaseComponent } from '../../shared/base-component';
import { ICar } from '../../shared/car-interface';
import { Car } from '../car/car';
import { RaceTrack } from '../race-track/race-track';
import './race-control.css';

export class RaceControl extends BaseComponent {
  private car = new Car(this.node);

  private delay: NodeJS.Timeout | null = null;

  private raceTime = 0;

  public readonly startButton: BaseButton = new BaseButton(this.node, 'start');

  public readonly stopButton: BaseButton = new BaseButton(this.node, 'stop');

  public readonly selectButton: BaseButton = new BaseButton(
    this.node,
    'select',
  );

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

  runCar(): void {
    this.car.setTransitionTime(`${this.raceTime}ms`);
    this.car.moveCar();
  }

  returnBackCar(): void {
    const time = '0s';
    this.car.setTransitionTime(time);
    this.car.returnBackCar();
  }

  stopCar(): void {
    this.car.stopCar();
  }

  setDelay(): Promise<RaceControl> {
    return new Promise((res) => {
      this.delay = setTimeout(() => res(this), this.raceTime);
    });
  }

  clearDelay(): void {
    if (!this.delay) return;
    clearTimeout(this.delay);
    this.delay = null;
  }
  
  setRaceTime(time: number): void {
    this.raceTime = time;
  }
  
  getCarInfo(): ICar {
    return this.carInfo;
  }
}
