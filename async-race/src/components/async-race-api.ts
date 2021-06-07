import { ICar } from '../shared/ICar';

export class AsyncRaceApi {
  private baseUrl = 'http://localhost:3000';

  async getTotalCount(path: string): Promise<string | null> {
    const response = await fetch(`${this.baseUrl}/${path}?_limit=1`);
    return response.headers.get('X-Total-Count');
  }

  async getGarageCars(): Promise<ICar[]> {
    const garageCars = await this.getData('garage');
    return garageCars;
  }

  async getData(path: string): Promise<ICar[]> {
    const response = await fetch(`${this.baseUrl}/${path}`);
    const data = await response.json();
    return data;
  }

  async postCar(car: ICar): Promise<void> {
    await fetch(`${this.baseUrl}/garage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
  }
}
