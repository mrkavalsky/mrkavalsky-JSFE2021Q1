import { AsyncRaceApi } from '../components/async-race-api';
import { CarList } from '../components/car-list/car-list';
import { BaseComponent } from './base-component';
import { BaseTitle } from './base-title';

export class BasePage extends BaseComponent {
  private title: BaseTitle;

  private asyncRaceApi: AsyncRaceApi = new AsyncRaceApi();

  private carList: CarList;

  private pageName: string;

  constructor(className: string) {
    super(null, 'main', className);
    [this.pageName] = className.split('-');
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
