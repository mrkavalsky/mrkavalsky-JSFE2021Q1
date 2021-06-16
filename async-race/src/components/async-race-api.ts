import { ICar, INewCar } from '../shared/car-interface';
import { IRaceSpecifications } from '../shared/race-specifications-interface';
import { INewWinner, IWinner } from '../shared/winner-interface';

export class AsyncRaceApi {
  private baseUrl = 'http://localhost:3000';

  private async getResponse(
    path: string,
    parameters = '',
    id = -1,
  ): Promise<Response> {
    const response: Response = await fetch(
      `${this.baseUrl}/${path}/${id < 0 ? '' : id}?${parameters}`,
    );
    return response;
  }

  async getTotalCount(path: string): Promise<number | null> {
    const parameters = '_limit=1';
    const response: Response = await this.getResponse(path, parameters);
    return Number(response.headers.get('X-Total-Count'));
  }

  async getGarageCars(): Promise<ICar[]> {
    const response: Response = await this.getResponse('garage');
    const garageCars: ICar[] = await response.json();
    return garageCars;
  }

  async getGarageCar(id: number): Promise<ICar> {
    const path = 'garage';
    const response: Response = await this.getResponse(path, '', id);
    const car: ICar = await response.json();
    return car;
  }

  private async postCar(
    car: INewCar | INewWinner,
    path: string,
  ): Promise<void> {
    await fetch(`${this.baseUrl}/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
  }

  private async updateCar(
    car: INewCar | INewWinner,
    id: number,
    path = 'garage',
  ): Promise<void> {
    await fetch(`${this.baseUrl}/${path}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(car),
    });
  }

  async deleteCar(id: number, path: string): Promise<void> {
    await fetch(`${this.baseUrl}/${path}/${id}`, {
      method: 'DELETE',
    });
  }

  async postGarageCar(car: INewCar): Promise<void> {
    const path = 'garage';
    await this.postCar(car, path);
  }

  async postWinner(car: INewWinner): Promise<void> {
    const path = 'winners';
    await this.postCar(car, path);
  }

  async updateGarageCar(car: INewCar, id: number): Promise<void> {
    const path = 'garage';
    await this.updateCar(car, id, path);
  }

  async updateWinner(car: INewWinner, id: number): Promise<void> {
    const path = 'winners';
    await this.updateCar(car, id, path);
  }

  private async getPage(
    path: string,
    pageNumber: number,
    limit: number,
    addParameters = '',
  ): Promise<Response> {
    const parameters = `${addParameters}_page=${pageNumber}&_limit=${limit}`;
    const response: Response = await this.getResponse(path, parameters);
    return response;
  }

  async getGaragePage(pageNumber: number, limit: number): Promise<ICar[]> {
    const path = 'garage';
    const response: Response = await this.getPage(path, pageNumber, limit);
    const page: ICar[] = await response.json();
    return page;
  }

  async startEngine(id: number): Promise<IRaceSpecifications> {
    const path = 'engine';
    const parameters = `id=${id}&status=started`;
    const response: Response = await this.getResponse(path, parameters);
    const raceSpecifications: IRaceSpecifications = await response.json();
    return raceSpecifications;
  }

  async stopEngine(id: number): Promise<Response> {
    const path = 'engine';
    const parameters = `id=${id}&status=stopped`;
    const response: Response = await this.getResponse(path, parameters);
    return response;
  }

  async switchEngineToDriveMode(id: number): Promise<void> {
    return new Promise((res, rej) => {
      const path = 'engine';
      const parameters = `id=${id}&status=drive`;
      this.getResponse(path, parameters).then((response) => {
        if (response.status === 500) rej(response.status);
        else res();
      });
    });
  }

  async getWinners(): Promise<IWinner[]> {
    const path = 'winners';
    const response: Response = await this.getResponse(path);
    const winners: IWinner[] = await response.json();
    return winners;
  }

  async getWinnersPage(
    pageNumber: number,
    limit: number,
    sort: string,
    order: string,
  ): Promise<IWinner[]> {
    const path = 'winners';
    const addParameters = `_sort=${sort}&_order=${order}&`;
    const response: Response = await this.getPage(
      path,
      pageNumber,
      limit,
      addParameters,
    );
    const page: IWinner[] = await response.json();
    return page;
  }
}
