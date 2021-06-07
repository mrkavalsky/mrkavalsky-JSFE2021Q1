import { BaseComponent } from './base-component';

export class BaseTitle extends BaseComponent {
  private caption: string;

  private totalCount = '0';

  constructor(parentNode: HTMLElement, pageName: string) {
    super(parentNode, 'h2', `${pageName}__title`);
    this.caption = pageName[0].toUpperCase() + pageName.slice(1);
    this.setTotalCount();
  }

  setTotalCount(count = '0'): void {
    this.totalCount = count;
    this.node.innerText = `${this.caption} (${this.totalCount})`;
  }
}
