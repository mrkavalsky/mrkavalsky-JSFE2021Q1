import { BaseButton } from '../../shared/base-button/base-button';
import { BaseComponent } from '../../shared/base-component';
import { CarAdjust } from '../car-adjust/car-adjust';

export class GarageControl extends BaseComponent {
  public readonly carAdjustCreate = new CarAdjust(this.node, 'create');

  public readonly carAdjustUpdate = new CarAdjust(this.node, 'update');

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
