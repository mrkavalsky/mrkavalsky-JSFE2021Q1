import { BasePage } from '../../components/base-page';
import { IUser } from '../../components/user-interface';
import { User } from '../../components/user/user';
import './best-score-page.css';

export class BestScorePage extends BasePage {
  constructor() {
    super('main', ['main'], [], 'best-score');
    this.element.innerHTML = `
      <h2 class="main__title">Best players</h2>
    `;
  }

  addBestScoreTable(users: IUser[] | void): void {
    if (!users) return;
    users.forEach((user) => {
      this.appendComponents([new User(user)]);
    })
  }
}
