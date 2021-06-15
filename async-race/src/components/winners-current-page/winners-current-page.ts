import { BaseComponent } from '../../shared/base-component';
import { IFullCarInfo } from '../../shared/full-car-info-interface';
import { Winner } from '../winner/winner';

export class WinnersCurrentPage extends BaseComponent {
  constructor(
    parentNode: HTMLElement,
    private currentPageNumber: number = 1,
    winners: IFullCarInfo[] = [],
    private pageLimit: number = 10,
  ) {
    super(parentNode, 'div', 'winners__current-page');
    this.initWinners(winners);
  }

  addWinner(placeNumber: number, winnerInfo: IFullCarInfo): Winner {
    return new Winner(this.node, placeNumber, winnerInfo);
  }

  initWinners(winners: IFullCarInfo[]): void {
    let placeNumber: number =
      this.currentPageNumber * this.pageLimit - this.pageLimit;
    winners.forEach((winner) => {
      placeNumber++;
      this.addWinner(placeNumber, winner);
    });
  }
}
