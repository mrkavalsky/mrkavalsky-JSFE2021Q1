import { BaseBlock } from '../base-block';
import { BaseButton } from '../base-button';
import { DataBase } from '../data-base';
import { Input } from '../input/input';
import { IUser } from '../user-interface';
import './form.css';

export class Form extends BaseBlock {
  public inputsArray: Input[] = [
    new Input('First Name', 'text'),
    new Input('Last Name', 'text'),
    new Input('E-mail', 'email'),
  ];

  public submitButton: BaseButton = new BaseButton(
    ['form__button', 'form__button_submit', 'form__button_submit_disable'],
    'add user',
  );

  public cancelButton: BaseButton = new BaseButton(
    ['form__button', 'form__button_cancel'],
    'cancel',
  );

  public isFormValidate = false;

  constructor(private output: DataBase) {
    super('form', ['form']);
    this.appendComponents(this.inputsArray);
    this.appendComponents([this.submitButton, this.cancelButton]);
    this.addFormValidationEvent();
  }

  addFormValidationEvent(): void {
    this.element.addEventListener('input', () => {
      this.validateForm();
    });
    this.element.addEventListener('change', () => {
      this.validateForm();
    });
    this.cancelButton.element.addEventListener('click', (e: MouseEvent) => {
      this.closeForm(e);
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

  closeForm(e: MouseEvent): void {
    e.preventDefault();
    document.body.lastElementChild?.remove();
    this.clearDownForm();
  }

  submitForm(): void {
    if (this.isFormValidate) {
      document.body.lastElementChild?.remove();
      const userInfo = this.inputsArray.map(
        (input) => input.getInputNode().value,
      );
        const user: IUser = {
          firstName: userInfo[0],
          lastName: userInfo[1],
          email: userInfo[2],
          score: 0,
        };
        this.output.addNewUser(user);
      this.clearDownForm();
    }
  }
}
