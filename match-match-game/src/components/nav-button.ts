import { BaseButton } from './base-button';

export class NavButton extends BaseButton {
  public pageHash: string;

  constructor(
    tag: keyof HTMLElementTagNameMap = 'div',
    styles: string[] = [],
    innerText: string,
  ) {
    super(tag, styles, innerText);
    this.pageHash = innerText.toLowerCase().split(' ').join('-');
    this.addChangeHashEvent();
  }

  addChangeHashEvent(): void {
    this.element.addEventListener('click', () => {
      window.location.hash = this.pageHash;
    });
  }
}
