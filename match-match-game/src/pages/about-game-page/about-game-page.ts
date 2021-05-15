import { BaseBlock } from '../../components/base-block';
import { BaseComponent } from '../../components/base-component';
import './about-game-page.css';

export class AboutGamePage extends BaseBlock {
  public mainContentWrapper: BaseBlock = new BaseBlock('div', ['main__content-wrapper']);
  public formButton: BaseComponent = new BaseComponent('button');
  public settingsButton: BaseComponent = new BaseComponent('button');
  public startGameButton: BaseComponent = new BaseComponent('button');
  public gameMenu: BaseBlock = new BaseBlock('div', [], [this.formButton, this.settingsButton, this.startGameButton]);
  constructor() {
    super('main', ['main'], []);
    this.element.innerHTML = `
      <h2 class="main__title">How to play?</h2>
    `;
    this.mainContentWrapper 
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
    `;
    this.mainContentWrapper.appendComponents([this.gameMenu]);
    this.appendComponents([this.mainContentWrapper]);
  }
}
