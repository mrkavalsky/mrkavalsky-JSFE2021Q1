import { AsyncRaceApi } from '../components/async-race-api';
import { BaseCarList } from '../components/base-car-list/base-car-list';
import { BaseComponent } from './base-component';
import { Title } from '../components/title';

export class BasePage extends BaseComponent {
  private title: Title;

  protected asyncRaceApi: AsyncRaceApi = new AsyncRaceApi();

  protected carList: BaseCarList;

  constructor(private pageName: string) {
    super(null, 'main', pageName);
    this.title = new Title(this.node, this.pageName);
    this.carList = new BaseCarList(this.node);
    this.refreshTotalCount();
  }

  async refreshTotalCount(): Promise<void> {
    const totalCount =
      (await this.asyncRaceApi.getTotalCount(this.pageName)) || '0';
    this.title.setTotalCount(totalCount);
  }
}
