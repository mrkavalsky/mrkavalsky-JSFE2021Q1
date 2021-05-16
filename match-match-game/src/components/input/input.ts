import { BaseBlock } from "../base-block";
import { BaseComponent } from "../base-component";
import './input.css';

export class Input extends BaseBlock {
  public caption: BaseComponent = new BaseComponent('div', ['input__caption']);
  public input: BaseComponent = new BaseComponent('input', ['input__field']);
  public error: BaseComponent = new BaseComponent('div', ['input__error']);
  constructor(caption: string, inputType: string) {
    super('div', ['input']);
    this.caption.element.innerText = caption;
    this.input.element.setAttribute('type', inputType);
    this.appendComponents([this.caption, this.input, this.error]);
    this.addValidationEvent();
  }
  addValidationEvent(): void {
    this.input.element.addEventListener('input', () => {
      const input = this.input.element as HTMLInputElement;
      this.error.element.innerText = this.inputValidation(input.value);
    });
  }
  inputValidation(inputValue: string): string {
    return 'blablabla';
  }
}