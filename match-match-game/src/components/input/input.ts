import { BaseBlock } from "../base-block";
import { BaseComponent } from "../base-component";
import './input.css';

export class Input extends BaseBlock {
  public caption: BaseComponent = new BaseComponent('div', ['input__caption']);
  public input: BaseComponent = new BaseComponent('input', ['input__field']);
  public error: BaseComponent = new BaseComponent('div', ['input__error']);
  public inputType: string;
  public isValidate: boolean = false;
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
      this.isValidate = false;
      this.error.element.innerText = this.inputType === 'text' ? this.validateTextInput() : this.validateEmailInput();
    });
  }
  validateTextInput(): string {
    const input:HTMLInputElement = this.getInputNode();
    const inputValue: string = input.value.trim();
    const captionText = this.caption.element.innerText.toLowerCase();
    if (inputValue.length === 0) return `!The ${captionText} cannot be empty`;
    if (inputValue.length === inputValue.match(/\d/g)?.length) return `!The ${captionText} cannot consist only of numbers`;
    if (/\s/.test(inputValue)) return `!The ${captionText} cannot contain more than one word`;
    if (/[~!@#$%*()_—+=|:;"'`<>,.?/^]/.test(inputValue)) return `!The ${captionText} cannot contain service symbols`;
    this.toggleIsValidate();
    return 'Ok';
  }
  validateEmailInput(): string {
    const input:HTMLInputElement = this.getInputNode();
    const inputValue: string = input.value.trim();
    const matchRes: string[] | null = inputValue.match(/\S+(?=@)/);
    if (!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(inputValue))) return `Invalid email`;
    if (matchRes === null) return 'Invalid email';
    if (matchRes[0].length > 64) return 'Invalid email';
    this.toggleIsValidate();
    return 'Ok';
  }
  toggleIsValidate() {
    this.isValidate = true;
  }
  clearDownInput(): void {
    const input:HTMLInputElement = this.getInputNode();
    input.value = '';
  }
  clearDownError(): void {
    this.error.element.innerText = '';
  }
  getInputNode(): HTMLInputElement {
    return this.input.element as HTMLInputElement;
  }
}