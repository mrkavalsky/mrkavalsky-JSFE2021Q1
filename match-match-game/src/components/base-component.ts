export class BaseComponent {
  readonly element: HTMLElement;

  constructor(tag: string = 'div', styles: string[] = [], text: string = '') {
    this.element = document.createElement(tag);
    this.element.classList.add(...styles);
    this.element.innerText = text;
  }
}
