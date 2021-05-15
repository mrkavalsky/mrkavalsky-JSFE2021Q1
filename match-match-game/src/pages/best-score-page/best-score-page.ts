import { BasePage } from "../../components/base-page";
import './best-score-page.css';

export class BestScorePage extends BasePage {
  constructor() {
    super('main', ['main'], [], 'best-score');
    this.element.innerHTML = `
      <h2 class="main__title">Best players</h2>
    `;
  }
}