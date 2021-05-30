import { BaseBlock } from '../../shared/base-block';
import { BaseButton } from '../../shared/base-button';
import { BaseComponent } from '../../shared/base-component';
import { DataBase } from '../data-base';
import { Input } from '../input/input';
import { IUser } from '../../shared/user-interface';
import './form.css';
import { FileInput } from '../file-input/file-input';
import { Canvas } from '../canvas';

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

  public isFormValid = false;

  private errorField: BaseComponent = new BaseComponent('div', [
    'form__error-field',
  ]);

  private fileInput: FileInput = new FileInput();

  private canvas: Canvas = new Canvas();

  constructor(private output: DataBase) {
    super('form', ['form']);
    this.appendComponents([
      new BaseBlock('div', ['form__inputs-wrapper'], this.inputsArray),
      this.fileInput,
    ]);
    this.appendComponents([
      this.errorField,
      this.submitButton,
      this.cancelButton,
    ]);
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
    this.isFormValid = false;
    if (
      this.inputsArray.filter(({ isValidate }) => isValidate).length ===
      this.inputsArray.length
    ) {
      this.submitButton.element.classList.remove('form__button_submit_disable');
      this.isFormValid = true;
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
    this.errorField.element.innerText = '';
  }

  async submitForm(): Promise<IUser | void> {
    if (!this.isFormValid) return undefined;
    const userInfo: string[] = this.inputsArray.map(
      (input) => input.getInputNode().value,
    );
    const user: IUser =
      this.output.findUser(userInfo[2]) || (await this.getNewUser(userInfo));
    if (!this.checkUser(user, userInfo)) return undefined;
    document.body.lastElementChild?.remove();
    this.clearDownForm();
    return user;
  }

  async getNewUser(userInfo: string[]): Promise<IUser> {
    const img = await this.fileInput.getImage();
    const user: IUser = {
      avatar: this.canvas.getBase64File(img),
      firstName: userInfo[0],
      lastName: userInfo[1],
      email: userInfo[2],
      score: 0,
      id: this.output.getID(),
    };
    this.output.addNewUser(user);
    return user;
  }

  checkUser({ firstName, lastName }: IUser, [fName, lName]: string[]): boolean {
    if (firstName !== fName || lastName !== lName) {
      this.errorField.element.innerText =
        'A user with this email address already exists';
      return false;
    }
    this.errorField.element.innerText = '';
    return true;
  }
}
