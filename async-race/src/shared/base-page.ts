import { AsyncRaceApi } from '../components/async-race-api';
import { BaseComponent } from './base-component';
import { BaseTitle } from './base-title';

export class BasePage extends BaseComponent {
  private title: BaseTitle;

  private asyncRaceApi: AsyncRaceApi = new AsyncRaceApi();

  private paginationElement: BaseComponent;

  private pageName: string;

  constructor(className: string) {
    super(null, 'main', className);
    [this.pageName] = className.split('-');
    this.title = new BaseTitle(this.node, this.pageName);
    this.paginationElement = new BaseComponent(
      this.node,
      'div',
      `${className}__pagination`,
      'Page #1',
    );
    this.refreshTotalCount();
  }

  async refreshTotalCount(): Promise<void> {
    const totalCount =
      (await this.asyncRaceApi.getTotalCount(this.pageName)) || '0';
    this.title.setTotalCount(totalCount);
  }
}
