import { BasePage } from '../../shared/base-page';
import { ScoreBlock } from '../../components/score-block/score-block';
import './best-score-page.css';

export class BestScorePage extends BasePage {
  public readonly scoreBlock = new ScoreBlock();

  constructor() {
    super('main', ['main'], [], 'best-score');
    this.element.innerHTML = `
      <h2 class="main__title">Best players</h2>
    `;
    this.appendComponents([this.scoreBlock]);
  }
}
