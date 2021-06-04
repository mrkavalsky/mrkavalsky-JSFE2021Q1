import { BaseButton } from '../shared/base-button';
import { BaseComponent } from '../shared/base-component';

export class Header extends BaseComponent {
  public readonly garageButton: BaseButton = new BaseButton(
    this.node,
    'to garage',
  );

  public readonly winnersButton: BaseButton = new BaseButton(
    this.node,
    'to winners',
  );

  constructor(rootElement: HTMLElement) {
    super(rootElement, 'header', 'header');
  }
}
