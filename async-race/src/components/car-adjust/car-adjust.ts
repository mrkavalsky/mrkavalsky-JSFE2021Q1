import { BaseButton } from '../../shared/base-button/base-button';
import { BaseComponent } from '../../shared/base-component';
import { INewCar } from '../../shared/car-interface';
import { ColorInput } from '../color-input/color-input';
import { TextInput } from '../text-input/text-input';
import './car-adjust.css';

export class CarAdjust extends BaseComponent {
  private textInput: TextInput = new TextInput(this.node);

  private colorInput: ColorInput = new ColorInput(this.node);

  public readonly submitButton: BaseButton;

  constructor(parentNode: HTMLElement, type: string) {
    super(parentNode, 'div', 'car-adjust');
    this.submitButton = new BaseButton(this.node, type);
  }

  getInputValues(): INewCar {
    const car: INewCar = {
      name: this.textInput.getValue(),
      color: this.colorInput.getValue(),
    };
    return car;
  }
}
