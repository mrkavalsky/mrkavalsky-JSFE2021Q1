import { BaseBlock } from '../base-block';
import { BaseComponent } from '../base-component';
import { Form } from '../form/form';
import './popup.css';

export class Popup extends BaseBlock {
  public form: Form = new Form();

  public popupBackground: BaseComponent = new BaseComponent('div', [
    'popup__background',
  ]);

  public formWrapper: BaseBlock = new BaseBlock('div', ['form-wrapper']);

  constructor(
    tag: string = 'div',
    styles: string[] = ['popup'],
    children: BaseComponent[] = [],
  ) {
    super(tag, styles, children);
    this.addHidePopupEvent();
    this.formWrapper.element.innerHTML = `
      <h2 class="popup__title">Register New Player</hw>
    `;
    this.formWrapper.appendComponents([this.form]);
    this.appendComponents([this.formWrapper, this.popupBackground]);
  }

  addHidePopupEvent(): void {
    this.popupBackground.element.addEventListener('click', () => {
      this.form.cancelButton.element.click();
    });
  }
}
