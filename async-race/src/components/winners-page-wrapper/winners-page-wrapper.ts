import { BaseButton } from '../../shared/base-button/base-button';
import { BaseComponent } from '../../shared/base-component';
import { BasePageWrapper } from '../../shared/base-page-wrapper/base-page-wrapper';
import { IFullCarInfo } from '../../shared/full-car-info-interface';
import { WinnersCurrentPage } from '../winners-current-page/winners-current-page';
import './winners-page-wrapper.css';

export class WinnersPageWrapper extends BasePageWrapper {
  private buttonsWrapper: BaseComponent = new BaseComponent(
    this.node,
    'div',
    'buttons-wrapper',
  );

  private placeNumber: BaseComponent = new BaseComponent(
    this.buttonsWrapper.node,
    'div',
    'button buttons-wrapper__place-number',
    '№',
  );

  private winnerCar: BaseComponent = new BaseComponent(
    this.buttonsWrapper.node,
    'div',
    'button buttons-wrapper__winner-car',
    'car',
  );

  private winnerName: BaseComponent = new BaseComponent(
    this.buttonsWrapper.node,
    'div',
    'button buttons-wrapper__winner-name',
    'name',
  );

  public readonly sortWinsButton: BaseButton = new BaseButton(
    this.buttonsWrapper.node,
    'wins',
  );

  public readonly sortTimeButton: BaseButton = new BaseButton(
    this.buttonsWrapper.node,
    'best time',
  );

  private winnersCurrentPage: WinnersCurrentPage = new WinnersCurrentPage(
    this.node,
  );

  constructor(parentNode: HTMLElement) {
    super(parentNode);
    this.sortWinsButton.node.classList.add('buttons-wrapper__winner-wins');
    this.sortTimeButton.node.classList.add('buttons-wrapper__winner-time');
  }

  refreshCarListPage(
    winners: IFullCarInfo[],
    currentPageNumber: number,
    pageLimit: number,
  ): void {
    this.node.lastElementChild?.remove();
    this.winnersCurrentPage = new WinnersCurrentPage(
      this.node,
      currentPageNumber,
      winners,
      pageLimit,
    );
  }
}
