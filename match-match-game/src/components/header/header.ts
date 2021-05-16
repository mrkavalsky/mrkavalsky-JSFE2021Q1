import { BaseBlock } from "../base-block";
import { BaseButton } from "../base-button";
import { BaseComponent } from "../base-component";
import { NavButton } from "../nav-button";
import './header.css';

export class Header extends BaseBlock {
  public logoBlock: BaseComponent = new BaseComponent('div', ['logo']);
  public navMenu: BaseBlock = new BaseBlock('nav', ['header__nav-menu']);
  public navMenuButtons: string[] = ['About Game', 'Best Score', 'Game Settings'];
  public RegisterButton: BaseButton = new BaseButton('button', ['header__register-button'], 'Register New Player');
  constructor(
    tag: keyof HTMLElementTagNameMap = 'header',
    styles: string[] = ['header'],
    children: BaseComponent[] = [],
  ) {
    super(tag, styles, children);
    this.navMenuButtons.forEach((name) => {
      this.navMenu.appendComponents([new NavButton('button', ['header__nav-button'], name)]);
    });
    this.logoBlock.element.innerHTML = `
      <div class="logo__part logo__part_blue">Match</div>
      <div class="logo__part logo__part_white">Match</div>
    `;
    this.appendComponents([this.logoBlock, this.navMenu, this.RegisterButton]);
  }
}