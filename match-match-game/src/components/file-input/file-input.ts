import { BaseBlock } from '../../shared/base-block';
import { BaseComponent } from '../../shared/base-component';
import './file-input.css';

export class FileInput extends BaseBlock {
  private input: BaseComponent = new BaseComponent('input', [
    'file-input__input',
  ]);

  constructor() {
    super('label', ['file-input']);
    this.input.element.setAttribute('type', 'file');
    this.appendComponents([this.input]);
  }
}
