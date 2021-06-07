import { AsyncRaceApi } from '../components/async-race-api';
import { CarList } from '../components/car-list/car-list';
import { BaseComponent } from './base-component';
import { BaseTitle } from '../components/base-title';

export class BasePage extends BaseComponent {
  private title: BaseTitle;

  private asyncRaceApi: AsyncRaceApi = new AsyncRaceApi();

  private carList: CarList;

  constructor(private pageName: string) {
    super(null, 'main', pageName);
    this.title = new BaseTitle(this.node, this.pageName);
    this.carList = new CarList(this.node);
    this.refreshTotalCount();
  }

  async refreshTotalCount(): Promise<void> {
    const totalCount =
      (await this.asyncRaceApi.getTotalCount(this.pageName)) || '0';
    this.title.setTotalCount(totalCount);
  }
}
