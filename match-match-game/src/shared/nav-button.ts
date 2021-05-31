import { BaseButton } from './base-button';

export class NavButton extends BaseButton {
  public pageHash: string;

  constructor(styles: string[] = [], innerText: string) {
    super(styles, innerText);
    this.pageHash = innerText.toLowerCase().split(' ').join('-');
    this.element.addEventListener('click', () => {
      window.location.hash = this.pageHash;
    });
  }
}
