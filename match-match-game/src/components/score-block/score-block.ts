import { BaseBlock } from '../../shared/base-block';
import { IUser } from '../../shared/user-interface';
import { User } from '../user/user';
import './score-block.css';

export class ScoreBlock extends BaseBlock {
  private userList: BaseBlock = new BaseBlock('div');

  constructor() {
    super('div', ['score-block']);
    this.appendComponents([this.userList]);
  }

  setUserList(users: IUser[] | void): void {
    if (!users) return;
    this.userList = new BaseBlock('div');
    users.forEach((user) => {
      this.userList.appendComponents([new User(user)]);
    });
  }

  refreshScoreBlock(users: IUser[] | void): void {
    this.element.lastElementChild?.remove();
    this.setUserList(users);
    this.element.append(this.userList.element);
  }
}
