import { BaseComponent } from './base-component';
import { BaseTitle } from './base-title';

export class BasePage extends BaseComponent {
  private title: BaseTitle;

  private paginationElement: BaseComponent;

  private pageName: string;

  constructor(className: string) {
    super(null, 'main', className);
    [this.pageName] = className.split('-');
    this.title = new BaseTitle(this.node, this.pageName);
    this.paginationElement = new BaseComponent(
      this.node,
      'div',
      `${className}__pagination`,
      'Page #1',
    );
  }
}
