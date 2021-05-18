import { BaseBlock } from '../base-block';
import { BaseButton } from '../base-button';
import { BaseComponent } from '../base-component';
import { Input } from '../input/input';
import './form.css';

export class Form extends BaseBlock {
  public inputsArray: Input[] = [
    new Input('First Name', 'text'),
    new Input('Last Name', 'text'),
    new Input('E-mail', 'email'),
  ];

  public submitButton: BaseButton = new BaseButton(
    'button',
    ['form__button', 'form__button_submit', 'form__button_submit_disable'],
    'add user',
  );

  public cancelButton: BaseButton = new BaseButton(
    'button',
    ['form__button', 'form__button_cancel'],
    'cancel',
  );

  public isFormValidate = false;

  constructor(
    tag: keyof HTMLElementTagNameMap = 'form',
    styles: string[] = ['form'],
    children: BaseComponent[] = [],
  ) {
    super(tag, styles, children);
    this.appendComponents(this.inputsArray);
    this.appendComponents([this.submitButton, this.cancelButton]);
    this.addFormValidationEvent();
  }

  addFormValidationEvent(): void {
    this.submitButton.element.addEventListener('click', (e) => {
      e.preventDefault();
      if (this.isFormValidate) document.body.lastElementChild?.remove();
      this.clearDownForm();
    });
    this.element.addEventListener('input', () => {
      this.validateForm();
    });
    this.cancelButton.element.addEventListener('click', (e) => {
      e.preventDefault();
      document.body.lastElementChild?.remove();
      this.clearDownForm();
    });
  }

  validateForm(): void {
    this.isFormValidate = false;
    if (
      this.inputsArray.filter(({ isValidate }) => isValidate).length ===
      this.inputsArray.length
    ) {
      this.submitButton.element.classList.remove('form__button_submit_disable');
      this.isFormValidate = true;
    } else
      this.submitButton.element.classList.add('form__button_submit_disable');
  }

  clearDownForm(): void {
    this.inputsArray.forEach((input) => {
      input.clearDownInput();
      input.clearDownError();
      this.validateForm();
    });
  }
}
