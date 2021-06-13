import { AsyncRaceApi } from '../components/async-race-api';
import { BaseComponent } from './base-component';
import { Title } from '../components/title';
import { ICar } from './car-interface';

export class BasePage extends BaseComponent {
  private title: Title;

  protected pageNumber = 0;

  protected pageLimit = 1;

  protected lastPageNumber = 1;

  protected currentPage: ICar[] = [];

  protected asyncRaceApi: AsyncRaceApi = new AsyncRaceApi();

  constructor(protected pageName: string) {
    super(null, 'main', pageName);
    this.title = new Title(this.node, this.pageName);
    this.refreshTotalCount();
  }

  async refreshTotalCount(): Promise<void> {
    const totalCount =
      (await this.asyncRaceApi.getTotalCount(this.pageName)) || 0;
    this.title.setTotalCount(totalCount);
  }

  setPageNumber(isForward: boolean): void {
    const nextPageNumber = isForward
      ? this.pageNumber + 1
      : this.pageNumber - 1;
    if (nextPageNumber < 1 || nextPageNumber > this.lastPageNumber) return;
    this.pageNumber = nextPageNumber;
  }

  async setLastPageNumber(): Promise<void> {
    const totalCount: number | null = await this.asyncRaceApi.getTotalCount(
      this.pageName,
    );
    if (!totalCount) return;
    this.lastPageNumber = Math.ceil(totalCount / this.pageLimit);
  }

  async changePage(isForward = true): Promise<void> {
    this.setPageNumber(isForward);
  }
}
