import { BaseBlock } from '../base-block';
import { BaseButton } from '../base-button';
import { BaseComponent } from '../base-component';
import { NavButton } from '../nav-button';
import './header.css';

export class Header extends BaseBlock {
  public logoBlock: BaseComponent = new BaseComponent('div', ['logo']);

  public navMenu: BaseBlock = new BaseBlock('nav', ['header__nav-menu']);

  public navMenuButtons: string[] = [
    'About Game',
    'Best Score',
    'Game Settings',
  ];

  public RegisterButton: BaseButton = new BaseButton(
    'button',
    ['header__register-button'],
    'Register New Player',
  );

  public settingsButton: BaseComponent;

  constructor(
    tag: keyof HTMLElementTagNameMap = 'header',
    styles: string[] = ['header'],
    children: BaseComponent[] = [],
  ) {
    super(tag, styles, children);
    this.navMenuButtons.forEach((name) => {
      this.navMenu.appendComponents([
        new NavButton('button', ['header__nav-button'], name),
      ]);
    });
    this.settingsButton = this.navMenu.children[2];
    this.logoBlock.element.innerHTML = `
      <div class="logo__part logo__part_blue">Match</div>
      <div class="logo__part logo__part_white">Match</div>
    `;
    this.appendComponents([this.logoBlock, this.navMenu, this.RegisterButton]);
    this.addActiveModeEventToButtons();
    this.navMenu.children[0].element.click();
  }

  addActiveModeEventToButtons() {
    this.navMenu.children.forEach((i) => {
      i.element.addEventListener('click', () => {
        this.navMenu.children.forEach((elem) => {
          elem.element.classList.remove('header__nav-button_active');
        });
        i.element.classList.add('header__nav-button_active');
      });
    });
  }
}
