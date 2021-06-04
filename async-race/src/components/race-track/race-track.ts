import { BaseComponent } from '../../shared/base-component';

export class RaceTrack extends BaseComponent {
  private finishFlag: BaseComponent = new BaseComponent(
    this.node,
    'div',
    'race-track__finish-flag',
  );

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'race-track');
  }
}
