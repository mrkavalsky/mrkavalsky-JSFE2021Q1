import { BaseBlock } from "../base-block";
import { BaseButton } from "../base-button";
import { BaseComponent } from "../base-component";
import { Input } from "../input/input";


export class Form extends BaseBlock {
  public inputsArray: Input[] = [new Input('First Name', 'text'), new Input('Last Name', 'text'), new Input('E-mail', 'email')];
  public submitButton: BaseButton = new BaseButton('button', ['form__button', 'form__button_submit']);
  public cancelButton: BaseButton = new BaseButton('button', ['form__button', 'form__button_cancel']);
  constructor(
    tag: keyof HTMLElementTagNameMap = 'form',
    styles: string[] = ['form'],
    children: BaseComponent[] = [],
  ) {
    super(tag, styles, children);
    this.appendComponents(this.inputsArray);
    this.appendComponents([this.submitButton, this.cancelButton]);
  }
}