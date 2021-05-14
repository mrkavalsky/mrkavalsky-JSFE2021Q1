import { BaseComponent } from "./base-component";

export class BaseBlock extends BaseComponent {
  constructor(tag: keyof HTMLElementTagNameMap = 'div', styles: string[] = [],public children: BaseComponent[] = []) {
    super(tag, styles);
    this.appendComponents(this.children);
  }
  appendComponents(components: BaseComponent[]): void {
    components.forEach((e:BaseComponent):void => {
      this.element.append(e.element);
    });
    this.children.concat(components);
  }
}