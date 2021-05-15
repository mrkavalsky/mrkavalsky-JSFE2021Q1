import { BaseBlock } from "../../components/base-block";
import './about-game-page.css';

export class AboutGamePage extends BaseBlock {
  constructor() {
    super('main', ['main'], []);
    this.element.innerHTML = `
      <h2 class="main__title">How to play?</h2>
    `;
    this.appendComponents([new BaseBlock('div', ['main__content-wrapper'])]);
    this.children[0].element.innerHTML = `
      <ul class="rules-list">
        <li class="rules-list__item1">
          <div class="rules-list__count">1</div>
          <p class="rules-list__text">Register new player in game</p>
        </li>
        <li class="rules-list__item2">
          <div class="rules-list__count">2</div>
          <p class="rules-list__text">Configure your game settings</p>
        </li>
        <li class="rules-list__item3"></li>
          <div class="rules-list__count">3</div>
          <p class="rules-list__text">Start you new game! Remember card positions and match it before times up</p>
      </ul>
    `;
  }
  
}