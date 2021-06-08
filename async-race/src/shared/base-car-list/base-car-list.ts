import { BaseButton } from '../base-button/base-button';
import { BaseComponent } from '../base-component';

export class BaseCarList extends BaseComponent {
  private pageNumberTitle: BaseComponent = new BaseComponent(
    this.node,
    'h3',
    '',
    'Page #1',
  );

  public readonly prevPage: BaseButton = new BaseButton(this.node, 'prev');

  public readonly nextPage: BaseButton = new BaseButton(this.node, 'next');

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'car-list');
  }

  setPageNumberTitle(pageNumber: number): void {
    this.pageNumberTitle.node.innerText = `Page #${pageNumber}`;
  }
}
