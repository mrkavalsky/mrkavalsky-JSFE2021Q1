import { BaseBlock } from "../base-block";
import { BaseComponent } from "../base-component";
import { Form } from "../form/form";

export class Popup extends BaseBlock {
  public form: Form = new Form();
  public formWrapper: BaseBlock = new BaseBlock('div', ['form-wrapper']);
  constructor (
    tag: keyof HTMLElementTagNameMap = 'div',
    styles: string[] = ['popup'],
    children: BaseComponent[] = [],
  ) {
    super(tag, styles, children);
    this.formWrapper.appendComponents([this.form]);
    this.appendComponents([this.formWrapper]);
  }

}