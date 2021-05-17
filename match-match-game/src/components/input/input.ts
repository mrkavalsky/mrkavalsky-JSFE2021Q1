import { BaseBlock } from "../base-block";
import { BaseComponent } from "../base-component";
import './input.css';

export class Input extends BaseBlock {
  public caption: BaseComponent = new BaseComponent('div', ['input__caption']);
  public input: BaseComponent = new BaseComponent('input', ['input__field']);
  public error: BaseComponent = new BaseComponent('div', ['input__error']);
  public inputType: string;
  constructor(caption: string, inputType: string) {
    super('div', ['input']);
    this.inputType = inputType;
    this.caption.element.innerText = caption;
    this.input.element.setAttribute('type', inputType);
    this.appendComponents([this.caption, this.input, this.error]);
    this.addValidationEvent();
  }
  addValidationEvent(): void {
    this.input.element.addEventListener('input', () => {
      this.error.element.innerText = this.inputType === 'text' ? this.textInputValidation() : this.textInputValidation();
    });
  }
  textInputValidation(): string {
    const input:HTMLInputElement = this.input.element as HTMLInputElement;
    const inputValue: string = input.value.trim();
    const captionText = this.caption.element.innerText.toLowerCase();
    if (inputValue.length === 0) return `!The ${captionText} cannot be empty`;
    if (inputValue.length === inputValue.match(/\d/g)?.length) return `!The ${captionText} cannot consist only of numbers`;
    if (/\s/.test(inputValue)) return `!The ${captionText} cannot contain more than one word`;
    if (/[~!@#$%*()_—+=|:;"'`<>,.?/^]/.test(inputValue)) return `!The ${captionText} cannot contain service symbols`;
    return 'Ok';
  }
}