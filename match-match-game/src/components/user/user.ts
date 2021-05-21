import { BaseBlock } from '../../shared/base-block';
import { BaseComponent } from '../base-component';
import { IUser } from '../user-interface';
import './user.css';

export class User extends BaseBlock {
  private userInfo: BaseBlock = new BaseBlock('div');

  private userScore: BaseBlock = new BaseBlock('div', ['user__score']);

  constructor(private user: IUser) {
    super('div', ['user']);
    this.userInfo.appendComponents([
      new BaseComponent(
        'div',
        ['user__name'],
        `${this.user.firstName} ${this.user.lastName}`,
      ),
      new BaseComponent('div', ['user__email'], `${this.user.email}`),
    ]);
    this.userScore.appendComponents([
      new BaseComponent('div', ['user__title'], `Score:`),
      new BaseComponent('div', ['user__result'], `${this.user.score}`),
    ]);
    this.appendComponents([this.userInfo, this.userScore]);
  }
}
