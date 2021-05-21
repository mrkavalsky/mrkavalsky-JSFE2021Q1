import { BaseBlock } from '../../shared/base-block';
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
    ['header__button'],
    'Register New Player',
  );

  public startGameButton: BaseButton = new BaseButton(
    ['header__button', 'header__button_hidden'],
    'start game',
  );

  public settingsButton: BaseComponent;

  constructor(
    tag = 'header',
    styles: string[] = ['header'],
    children: BaseComponent[] = [],
  ) {
    super(tag, styles, children);
    this.navMenuButtons.forEach((name) => {
      this.navMenu.appendComponents([
        new NavButton(['header__nav-button'], name),
      ]);
    });
    [, , this.settingsButton] = this.navMenu.children;
    this.logoBlock.element.innerHTML = `
      <div class="logo__part logo__part_blue">Match</div>
      <div class="logo__part logo__part_white">Match</div>
    `;
    this.appendComponents([
      this.logoBlock,
      this.navMenu,
      this.RegisterButton,
      this.startGameButton,
    ]);
    this.addActiveModeEventToButtons();
    this.navMenu.children[0].element.click();
  }

  addActiveModeEventToButtons(): void {
    this.navMenu.children.forEach((i) => {
      i.element.addEventListener('click', () => {
        this.navMenu.children.forEach((elem) => {
          elem.element.classList.remove('header__nav-button_active');
        });
        i.element.classList.add('header__nav-button_active');
      });
    });
  }

  showStartGameButton(): void {
    this.RegisterButton.element.classList.add('header__button_hidden');
    this.startGameButton.element.classList.remove('header__button_hidden');
    this.navMenu.element.classList.add('header__nav-menu_margin');
  }
}
