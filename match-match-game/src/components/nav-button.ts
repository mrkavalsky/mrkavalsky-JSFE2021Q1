import { BaseButton } from "./base-button";

export class navButton extends BaseButton {
  constructor(tag: keyof HTMLElementTagNameMap = 'div', styles: string[] = [], innerText: string = '', public pageHash: string) {
    super(tag, styles, innerText);
    this.addChangeHashEvent();
  }
  addChangeHashEvent() {
    this.element.addEventListener('click', () => window.location.hash = this.pageHash);
  }
}