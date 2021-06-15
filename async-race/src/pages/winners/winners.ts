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
  }

  async refreshPage(): Promise<void> {
    this.winnersPage = await this.asyncRaceApi.getWinnersPage(
      this.pageNumber,
      this.pageLimit,
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
}
