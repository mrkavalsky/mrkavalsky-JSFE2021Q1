export class BaseComponent {
  readonly element: HTMLElement;

  constructor(tag = 'div', styles: string[] = [], text = '') {
    this.element = document.createElement(tag);
    this.element.classList.add(...styles);
    this.element.innerText = text;
  }
}
