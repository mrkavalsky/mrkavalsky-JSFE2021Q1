import { BaseComponent } from './base-component';

export class BaseTitle extends BaseComponent {
  private caption: string;

  private totalCount = '0';

  constructor(node: HTMLElement, pageName: string) {
    super(node, 'h2', `${node.className}__title`);
    this.caption = pageName[0].toUpperCase() + pageName.slice(1);
  }

  setTotalCount(count = '0'): void {
    this.totalCount = count;
    this.node.innerText = `${this.caption} (${this.totalCount})`;
  }
}
