export class BaseComponent {
  public node: HTMLElement;

  constructor(
    parentNode: HTMLElement | null,
    tagName = 'div',
    className = '',
    content = '',
  ) {
    const element = document.createElement(tagName);
    element.className = className;
    element.textContent = content;
    if (parentNode) {
      parentNode.append(element);
    }
    this.node = element;
  }
}
