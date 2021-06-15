import { BaseComponent } from '../../shared/base-component';
import { IFullCarInfo } from '../../shared/full-car-info-interface';
import './winner.css';

export class Winner extends BaseComponent {
  private placeNumber: BaseComponent = new BaseComponent(
    this.node,
    'div',
    'winner__info winner__info_place-number',
  );

  private car: BaseComponent = new BaseComponent(
    this.node,
    'div',
    'winner__info winner__info_car',
  );

  private name: BaseComponent = new BaseComponent(
    this.node,
    'div',
    'winner__info winner__info_name',
  );

  private numberOfWins: BaseComponent = new BaseComponent(
    this.node,
    'div',
    'winner__info winner__info_wins',
  );

  private bestTime: BaseComponent = new BaseComponent(
    this.node,
    'div',
    'winner__info winner__info_time',
  );

  constructor(
    parentNode: HTMLElement,
    placeNumber: number,
    winnerInfo: IFullCarInfo,
  ) {
    super(parentNode, 'div', 'winner');
    this.placeNumber.node.innerText = placeNumber.toString();
    this.car.node.style.backgroundColor = winnerInfo.color;
    this.name.node.innerText = winnerInfo.name;
    this.numberOfWins.node.innerText = winnerInfo.wins.toString();
    this.bestTime.node.innerText = winnerInfo.time.toString();
  }
}
