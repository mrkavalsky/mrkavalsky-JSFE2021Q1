import { BaseBlock } from '../../shared/base-block';
import { IUser } from '../user-interface';
import { User } from '../user/user';
import './score-block.css';

export class ScoreBlock extends BaseBlock {
  private userList: BaseBlock = new BaseBlock('div');

  constructor() {
    super('div', ['score-block']);
    this.appendComponents([this.userList]);
  }

  getBestScoreList(users: IUser[] | void): void {
    if (!users) return;
    users.forEach((user) => {
      this.userList.appendComponents([new User(user)]);
    });
  }

  refreshBestScore(users: IUser[] | void): void {
    this.element.lastElementChild?.remove();
    this.userList = new BaseBlock('div');
    this.getBestScoreList(users);
    this.element.append(this.userList.element);
  }
}
