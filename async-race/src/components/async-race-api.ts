import { ICar } from '../shared/ICar';

export class AsyncRaceApi {
  private baseUrl = 'http://localhost:3000';

  async getTotalCount(path: string): Promise<string | null> {
    const response = await fetch(`${this.baseUrl}/${path}?_limit=1`);
    return response.headers.get('X-Total-Count');
  }

  async getGarageCars(path: string): Promise<ICar[]> {
    const response = await fetch(`${this.baseUrl}/${path}`);
    return response.json();
  }
}
