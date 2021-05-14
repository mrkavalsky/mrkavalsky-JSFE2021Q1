import { BaseComponent } from "./base-component";

export class BaseBlock extends BaseComponent {
  constructor(tag: keyof HTMLElementTagNameMap = 'div', styles: string[] = [],public children: BaseComponent[] = []) {
    super(tag, styles);
  }
  appendComponent(element: BaseComponent): void {
    this.component.append(element.component);
    this.children.push(element);
  }
}