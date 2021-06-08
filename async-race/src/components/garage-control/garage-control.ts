import { BaseButton } from '../../shared/base-button/base-button';
import { BaseComponent } from '../../shared/base-component';
import { CarControl } from '../car-control/car-control';

export class GarageControl extends BaseComponent {
  public readonly carControlCreate = new CarControl(this.node, 'create');

  public readonly carControlUpdate = new CarControl(this.node, 'update');

  public readonly raceButton: BaseButton = new BaseButton(this.node, 'race');

  public readonly resetButton: BaseButton = new BaseButton(this.node, 'reset');

  public readonly generateCarsButton: BaseButton = new BaseButton(
    this.node,
    'generate cars',
  );

  constructor(parentNode: HTMLElement) {
    super();
    parentNode.prepend(this.node);
  }
}
