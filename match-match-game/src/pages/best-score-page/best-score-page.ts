import { BaseBlock } from "../../components/base-block";
import './best-score-page.css';

export class BestScorePage extends BaseBlock {
  constructor() {
    super('main', ['main'], []);
    this.element.innerHTML = `
      <h2 class="main__title">Best players</h2>
    `;
  }
}