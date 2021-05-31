import { BaseBlock } from '../../shared/base-block';
import { BasePage } from '../../shared/base-page';
import './about-game-page.css';
import registerFormImg from '../../assets/images/register-form.png';
import gamePageImg from '../../assets/images/game-page.png';
import settingsButtonImg from '../../assets/images/settings-button.png';

export class AboutGamePage extends BasePage {
  public mainContentWrapper: BaseBlock = new BaseBlock('div', [
    'main__content-wrapper',
  ]);

  constructor() {
    super('main', ['main'], [], 'about-game');
    this.element.innerHTML = `
      <h2 class="main__title">How to play?</h2>
    `;
    this.mainContentWrapper.element.innerHTML = `
      <ul class="rules-list">
        <li class="rules-list__item rules-list__item_item1">
          <div class="rules-list__count">1</div>
          <p class="rules-list__text">Register new player in game</p>
        </li>
        <li class="rules-list__item rules-list__item_item2">
          <div class="rules-list__count">2</div>
          <p class="rules-list__text">Configure your game settings</p>
        </li>
        <li class="rules-list__item rules-list__item_item3">
          <div class="rules-list__count">3</div>
          <p class="rules-list__text">Start you new game! Remember card positions and match it before times up</p>
        </li>
      </ul>
      <div class="instruction">
        <img class="instruction__img instruction__img_img1" src=${registerFormImg} alt="register form">
        <img class="instruction__img instruction__img_img2" src=${settingsButtonImg} alt="settings button">
        <img class="instruction__img instruction__img_img3" src=${gamePageImg} alt="game page">
      </div>
    `;
    this.appendComponents([this.mainContentWrapper]);
  }
}
