export class BaseComponent {
  readonly component:HTMLElement;
  constructor(tag: keyof HTMLElementTagNameMap = 'div', styles: string[] = []) {
    this.component = document.createElement(tag);
    this.component.classList.add(...styles);
  }
}
