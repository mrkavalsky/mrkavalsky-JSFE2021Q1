import { BaseComponent } from './base-component';

export class BasePage extends BaseComponent {
  private title: BaseComponent;

  private paginationElement: BaseComponent;

  private pageName: string;

  constructor(className: string) {
    super(null, 'main', className);
    [this.pageName] = className.split('-');
    const caption = this.pageName[0].toUpperCase() + this.pageName.slice(1);
    this.title = new BaseComponent(
      this.node,
      'h2',
      `${className}__title`,
      `${caption} (0)`,
    );
    this.paginationElement = new BaseComponent(
      this.node,
      'div',
      `${className}__pagination`,
      'Page #1',
    );
  }
}
