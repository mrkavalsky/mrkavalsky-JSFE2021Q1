import { BaseInput } from '../../shared/base-input';
import './color-input.css';

export class ColorInput extends BaseInput {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'color-input');
    this.inputNode.type = 'color';
  }
}
