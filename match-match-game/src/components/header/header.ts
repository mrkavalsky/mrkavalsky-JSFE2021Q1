import { BaseBlock } from '../../shared/base-block';
import { BaseButton } from '../../shared/base-button';
import { BaseComponent } from '../../shared/base-component';
import { NavButton } from '../../shared/nav-button';
import './header.css';

export class Header extends BaseBlock {
  public logoBlock: BaseComponent = new BaseComponent('div', ['logo']);

  public navMenu: BaseBlock = new BaseBlock('nav', ['header__nav-menu']);

  public stopGameButton = new BaseButton(
    ['header__button', 'header__button_hidden'],
    'stop game',
  );

  private navMenuButtons: NavButton[] = [
    new NavButton(['header__nav-button'], 'About Game'),
    new NavButton(['header__nav-button'], 'Best Score'),
    new NavButton(['header__nav-button'], 'Game Settings'),
  ];

  public RegisterButton: BaseButton = new BaseButton(
    ['header__button'],
    'Register New Player',
  );

  public startGameButton: NavButton = new NavButton(
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
    this.navMenu.appendComponents(this.navMenuButtons);
    [, , this.settingsButton] = this.navMenu.children;
    this.logoBlock.element.innerHTML = `
      <div class="logo__part logo__part_blue">Match</div>
      <div class="logo__part logo__part_white">Match</div>
    `;
    this.startGameButton.element.addEventListener('click', () => {
      this.navMenu.children.forEach((elem) => {
        elem.element.classList.remove('header__nav-button_active');
      });
    });
    this.appendComponents([
      this.logoBlock,
      this.navMenu,
      this.RegisterButton,
      this.startGameButton,
      this.stopGameButton,
    ]);
    this.addActiveModeEventToButtons();
    this.startGameButton.element.addEventListener('click', () =>
      this.showStopGameButton(),
    );
    this.stopGameButton.element.addEventListener('click', () =>
      this.showStartGameButton(),
    );
  }

  addActiveModeEventToButtons(): void {
    this.navMenuButtons.forEach(({ element }) => {
      element.addEventListener('click', () => {
        this.navMenuButtons.forEach((i) => {
          i.element.classList.remove('header__nav-button_active');
        });
        element.classList.add('header__nav-button_active');
      });
    });
  }

  showStartGameButton(): void {
    this.RegisterButton.element.classList.add('header__button_hidden');
    this.stopGameButton.element.classList.add('header__button_hidden');
    this.startGameButton.element.classList.remove('header__button_hidden');
    this.navMenu.element.classList.add('header__nav-menu_margin');
  }

  showStopGameButton(): void {
    this.startGameButton.element.classList.add('header__button_hidden');
    this.stopGameButton.element.classList.remove('header__button_hidden');
  }

  clickOnNavButton(target: string): void {
    const button: NavButton | undefined = this.navMenuButtons
      .concat([this.startGameButton])
      .find(({ pageHash }) => pageHash === target);
    if (!button) return;
    button.element.click();
  }
}
