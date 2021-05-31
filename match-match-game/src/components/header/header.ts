import { BaseBlock } from '../../shared/base-block';
import { BaseButton } from '../../shared/base-button';
import { BaseComponent } from '../../shared/base-component';
import { NavButton } from '../../shared/nav-button';
import './header.css';
import defaultAvatar from '../../assets/images/default-avatar.png';

export class Header extends BaseBlock {
  private logoBlock: BaseComponent = new BaseComponent('div', ['logo']);

  private navMenu: BaseBlock = new BaseBlock('nav', ['header__nav-menu']);

  public readonly stopGameButton = new BaseButton(
    ['header__button', 'header__button_hidden'],
    'stop game',
  );

  private navMenuButtons: NavButton[] = [
    new NavButton(['header__nav-button'], 'About Game'),
    new NavButton(['header__nav-button'], 'Best Score'),
    new NavButton(['header__nav-button'], 'Game Settings'),
  ];

  public readonly registerButton: BaseButton = new BaseButton(
    ['header__button'],
    'Register New Player',
  );

  public readonly startGameButton: NavButton = new NavButton(
    ['header__button', 'header__button_hidden'],
    'start game',
  );

  private userAvatar: BaseComponent = new BaseComponent('img', [
    'header__avatar',
    'header__avatar_hidden',
  ]);

  constructor() {
    super('header', ['header']);
    this.navMenu.appendComponents(this.navMenuButtons);
    this.logoBlock.element.innerHTML = `
      <div class="logo__part logo__part_blue">Match</div>
      <div class="logo__part logo__part_white">Match</div>
    `;
    this.startGameButton.element.addEventListener('click', () => {
      this.navMenu.children.forEach((elem) => {
        elem.element.classList.remove('header__nav-button_active');
      });
    });
    const buttonsWrapper = new BaseBlock(
      'div',
      ['header__buttons-wrapper'],
      [
        this.registerButton,
        this.startGameButton,
        this.stopGameButton,
        this.userAvatar,
      ],
    );
    this.appendComponents([this.logoBlock, this.navMenu, buttonsWrapper]);
    this.navMenuButtons.forEach(({ element }) => {
      element.addEventListener('click', () => {
        this.navMenuButtons.forEach((i) => {
          i.element.classList.remove('header__nav-button_active');
        });
        element.classList.add('header__nav-button_active');
      });
    });
    this.startGameButton.element.addEventListener('click', () =>
      this.showStopGameButton(),
    );
    this.stopGameButton.element.addEventListener('click', () =>
      this.showStartGameButton(),
    );
  }

  showStartGameButton(): void {
    this.registerButton.element.classList.add('header__button_hidden');
    this.stopGameButton.element.classList.add('header__button_hidden');
    this.startGameButton.element.classList.remove('header__button_hidden');
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

  showUserAvatar(userAvatar: string | undefined): void {
    const image: HTMLImageElement = this.userAvatar.element as HTMLImageElement;
    image.src = userAvatar
      ? `data:image/png;base64,${userAvatar}`
      : defaultAvatar;
    this.userAvatar.element.classList.remove('header__avatar_hidden');
  }
}
