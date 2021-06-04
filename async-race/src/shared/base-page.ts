import { BaseComponent } from './base-component';

export class BasePage extends BaseComponent {
  private title: BaseComponent;

  private paginationElement: BaseComponent;

  constructor(className: string) {
    super(null, 'main', className);
    const pageName = className[0].toUpperCase() + className.slice(1);
    this.title = new BaseComponent(
      this.node,
      'h2',
      `${className}__title`,
      `${pageName} (0)`,
    );
    this.paginationElement = new BaseComponent(
      this.node,
      'div',
      `${className}__pagination`,
      'Page #1',
    );
  }
}
