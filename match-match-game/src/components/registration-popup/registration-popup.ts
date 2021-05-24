import { BaseBlock } from '../../shared/base-block';
import { BaseComponent } from '../../shared/base-component';
import { DataBase } from '../data-base';
import { Form } from '../form/form';
import './registration-popup.css';

export class RegistrationPopup extends BaseBlock {
  public form: Form;

  public popupBackground: BaseComponent = new BaseComponent('div', [
    'popup__background',
  ]);

  public formWrapper: BaseBlock = new BaseBlock('div', ['form-wrapper']);

  constructor(private output: DataBase) {
    super('div', ['popup']);
    this.form = new Form(this.output);
    this.addHidePopupEvent();
    this.formWrapper.element.innerHTML = `
      <h2 class="popup__title">Register New Player</hw>
    `;
    this.formWrapper.appendComponents([this.form]);
    this.appendComponents([this.formWrapper, this.popupBackground]);
  }

  addHidePopupEvent(): void {
    this.popupBackground.element.addEventListener('click', () => {
      this.form.cancelButton.element.click();
    });
  }
}
