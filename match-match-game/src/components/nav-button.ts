import { BaseButton } from './base-button';

export class NavButton extends BaseButton {
  constructor(
    tag: keyof HTMLElementTagNameMap = 'div',
    styles: string[] = [],
    innerText = '',
    public pageHash: string,
  ) {
    super(tag, styles, innerText);
    this.addChangeHashEvent();
  }

  addChangeHashEvent(): void {
    this.element.addEventListener('click', () => {
      window.location.hash = this.pageHash;
    });
  }
}
