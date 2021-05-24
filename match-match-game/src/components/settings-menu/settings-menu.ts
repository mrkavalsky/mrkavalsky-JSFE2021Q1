import { BaseBlock } from '../../shared/base-block';
import { BaseComponent } from '../../shared/base-component';
import './settings-menu.css';

export class SettingsMenu extends BaseBlock {
  private caption: BaseComponent = new BaseComponent('div', [
    'settings-menu__caption',
  ]);

  private select: BaseBlock = new BaseBlock('select', [
    'settings-menu__select',
  ]);

  private optionsTitle: BaseComponent = new BaseComponent('option');

  constructor(title: string, optionTitle: string, options: string[]) {
    super('div', ['settings-menu']);
    this.caption.element.innerText = title;
    this.optionsTitle.element.innerText = optionTitle;
    this.optionsTitle.element.setAttribute('disabled', 'disabled');
    this.optionsTitle.element.setAttribute('selected', 'selected');
    this.select.appendComponents([this.optionsTitle]);
    this.select.appendComponents(
      options.map((option) => new BaseComponent('option', [], option)),
    );
    this.appendComponents([this.caption, this.select]);
  }

  getMenuNode(): HTMLSelectElement {
    return this.select.element as HTMLSelectElement;
  }
}
