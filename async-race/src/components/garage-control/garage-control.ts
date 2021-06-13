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

  toggleCarAdjustButtonsMode(isEnable = true): void {
    this.carAdjustCreate.submitButton.toggleButtonMode(isEnable);
    this.carAdjustUpdate.submitButton.toggleButtonMode(isEnable);
  }

  toggleRaceButtonMode(isEnable = true): void {
    this.raceButton.toggleButtonMode(isEnable);
  }

  toggleResetButtonMode(isEnable = true): void {
    this.resetButton.toggleButtonMode(isEnable);
  }

  toggleGenerateButtonMode(isEnable = true): void {
    this.generateCarsButton.toggleButtonMode(isEnable);
  }

  toggleAllButtonsMode(isEnable = true): void {
    this.toggleCarAdjustButtonsMode(isEnable);
    this.toggleGenerateButtonMode(isEnable);
    this.toggleRaceButtonMode(isEnable);
    this.toggleResetButtonMode(isEnable);
  }
}
