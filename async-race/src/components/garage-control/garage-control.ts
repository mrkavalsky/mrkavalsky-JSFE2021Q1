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

  toggleCarAdjustButtonsMode(isDisable = true): void {
    this.carAdjustCreate.submitButton.toggleButtonMode(isDisable);
    this.carAdjustUpdate.submitButton.toggleButtonMode(isDisable);
  }

  toggleRaceButtonMode(isDisable = true): void {
    this.raceButton.toggleButtonMode(isDisable);
  }

  toggleResetButtonMode(isDisable = true): void {
    this.resetButton.toggleButtonMode(isDisable);
  }

  toggleGenerateButtonMode(isDisable = true): void {
    this.generateCarsButton.toggleButtonMode(isDisable);
  }

  toggleAllButtonsMode(isDisable = true): void {
    this.toggleCarAdjustButtonsMode(isDisable);
    this.toggleGenerateButtonMode(isDisable);
    this.toggleRaceButtonMode(isDisable);
    this.toggleResetButtonMode(isDisable);
  }
}
