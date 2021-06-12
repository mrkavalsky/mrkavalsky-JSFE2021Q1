import { ICar } from '../shared/ICar';
import { IRaceSpecifications } from '../shared/race-specifications-interface';

export class AsyncRaceApi {
  private baseUrl = 'http://localhost:3000';

  async getTotalCount(path: string): Promise<number | null> {
    const response = await fetch(`${this.baseUrl}/${path}?_limit=1`);
    return Number(response.headers.get('X-Total-Count'));
  }

  async getGarageCars(): Promise<ICar[]> {
    const garageCars = await this.getData('garage');
    return garageCars;
  }

  async getData(path: string, parameters = ''): Promise<ICar[]> {
    const response = await fetch(`${this.baseUrl}/${path}${parameters}`);
    const data = await response.json();
    return data;
  }

  async postCar(car: ICar, path = 'garage'): Promise<void> {
    await fetch(`${this.baseUrl}/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
  }

  async updateCar(car: ICar, path = 'garage'): Promise<void> {
    await fetch(`${this.baseUrl}/${path}/${car.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
  }

  async deleteCar(id: number): Promise<void> {
    await fetch(`${this.baseUrl}/garage/${id}`, {
      method: 'DELETE',
    });
  }

  async getPage(path: string, page: number, limit: number): Promise<ICar[]> {
    const data = await this.getData(path, `?_page=${page}&_limit=${limit}`);
    return data;
  }

  async startEngine(id: number): Promise<IRaceSpecifications> {
    const response = await fetch(
      `${this.baseUrl}/engine?id=${id}&status=started`,
    );
    const data = await response.json();
    return data;
  }

  async stopEngine(id: number): Promise<ICar[]> {
    const data = await this.getData('engine', `?id=${id}&status=stopped`);
    return data;
  }

  async switchEngineToDriveMode(id: number): Promise<void> {
    return new Promise((res, rej) => {
      fetch(`${this.baseUrl}/engine?id=${id}&status=drive`).then((response) => {
        if (response.status === 500) rej(response.status);
        else res();
      });
    });
  }

  async getWinners(): Promise<ICar[]> {
    const winners = await this.getData('winners');
    return winners;
  }
}
