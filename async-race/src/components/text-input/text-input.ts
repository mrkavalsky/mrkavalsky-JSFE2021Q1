import { BaseInput } from '../../shared/base-input';

export class TextInput extends BaseInput {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'test-input');
    this.inputNode.type = 'text';
  }
}
