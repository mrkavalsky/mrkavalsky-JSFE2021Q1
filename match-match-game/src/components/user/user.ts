import { BaseBlock } from '../../shared/base-block';
import { BaseComponent } from '../../shared/base-component';
import { IUser } from '../../shared/user-interface';
import './user.css';
import defaultAvatar from '../../assets/images/default-avatar.png';

export class User extends BaseBlock {
  private userInfo: BaseBlock = new BaseBlock('div', ['user__info']);

  private userScore: BaseBlock = new BaseBlock('div', ['user__score']);

  constructor(private user: IUser) {
    super('div', ['user']);
    const userAvatar: BaseComponent = new BaseComponent('img', [
      'user__avatar',
    ]);
    const image: HTMLImageElement = userAvatar.element as HTMLImageElement;
    image.src = this.user.avatar
      ? `data:image/png;base64,${this.user.avatar}`
      : defaultAvatar;
    this.userInfo.appendComponents([
      userAvatar,
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
