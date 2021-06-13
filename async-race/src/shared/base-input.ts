import { BaseComponent } from './base-component';

export class BaseInput extends BaseComponent {
  public inputNode: HTMLInputElement;

  protected defaultValue = '';

  constructor(parentNode: HTMLElement, className: string) {
    super(parentNode, 'input', className);
    this.inputNode = this.node as HTMLInputElement;
  }

  getValue(): string {
    return this.inputNode.value;
  }

  resetInput(): void {
    this.inputNode.value = this.defaultValue;
  }
}
