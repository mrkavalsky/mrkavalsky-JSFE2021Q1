import { WinnersPageWrapper } from '../../components/winners-page-wrapper/winners-page-wrapper';
import { BasePage } from '../../shared/base-page';
import { ICar } from '../../shared/car-interface';
import { IFullCarInfo } from '../../shared/full-car-info-interface';
import { IWinner } from '../../shared/winner-interface';

export class Winners extends BasePage {
  private winnersPageWrapper: WinnersPageWrapper = new WinnersPageWrapper(
    this.node,
  );

  private winnersPage: IWinner[] = [];

  private sort = 'id';

  private order = 'asc';

  constructor() {
    super('winners');
    this.pageLimit = 10;
    this.pageNumber = 1;
    this.refreshPage();
    this.setLastPageNumber();
    this.winnersPageWrapper.nextPage.node.addEventListener('click', () =>
      this.changePage(),
    );
    this.winnersPageWrapper.prevPage.node.addEventListener('click', () =>
      this.changePage(false),
    );
    this.winnersPageWrapper.sortWinsButton.node.addEventListener('click', () =>
      this.changeSort('wins'),
    );
    this.winnersPageWrapper.sortTimeButton.node.addEventListener('click', () =>
      this.changeSort('time'),
    );
  }

  async refreshPage(): Promise<void> {
    this.toggleAllButtonsMode();
    this.winnersPage = await this.asyncRaceApi.getWinnersPage(
      this.pageNumber,
      this.pageLimit,
      this.sort,
      this.order,
    );
    const cars: IFullCarInfo[] = await Promise.all(
      this.winnersPage.map((winner) => this.getFullCarInfo(winner)),
    );
    this.winnersPageWrapper.setPageNumberTitle(this.pageNumber);
    this.winnersPageWrapper.refreshCarListPage(
      cars,
      this.pageNumber,
      this.pageLimit,
    );
    this.setLastPageNumber();
    this.toggleAllButtonsMode(false);
  }

  async getFullCarInfo({ id, wins, time }: IWinner): Promise<IFullCarInfo> {
    const { name, color }: ICar = await this.asyncRaceApi.getGarageCar(id);
    const car: IFullCarInfo = {
      id,
      name,
      color,
      wins,
      time,
    };
    return car;
  }

  async changePage(isForward = true): Promise<void> {
    this.setPageNumber(isForward);
    await this.refreshPage();
  }

  changeOrder(): void {
    this.order = this.order === 'asc' ? 'desc' : 'asc';
  }

  async changeSort(sort: string): Promise<void> {
    if (this.sort === sort) {
      this.changeOrder();
    } else {
      this.sort = sort;
      this.order = 'asc';
    }
    await this.refreshPage();
  }

  toggleAllButtonsMode(isEnable = true): void {
    this.winnersPageWrapper.nextPage.toggleButtonMode(isEnable);
    this.winnersPageWrapper.prevPage.toggleButtonMode(isEnable);
    this.winnersPageWrapper.sortWinsButton.toggleButtonMode(isEnable);
    this.winnersPageWrapper.sortTimeButton.toggleButtonMode(isEnable);
  }
}
