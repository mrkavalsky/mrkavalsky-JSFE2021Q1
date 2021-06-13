import { ICar } from '../shared/car-interface';
import { ICarModel } from './car-model-interface';

function getRandomInt(): number {
  return Math.round(Math.random() * 9);
}

function getColor(): string {
  return Math.round(Math.random() * 255).toString(16);
}

function getCarColor(): string {
  return `#${getColor()}${getColor()}${getColor()}`;
}

function getCarName(data: ICarModel[]): string {
  const carModel: ICarModel = data[getRandomInt()];
  return `${carModel.manufacturer} ${carModel.models[getRandomInt()]}`;
}

export async function getCars(): Promise<ICar[]> {
  const cars: ICar[] = [];
  const response: Response = await fetch('./car-models.json');
  const data: ICarModel[] = await response.json();
  for (let i = 0; i < 100; i++) {
    const car: ICar = {
      name: getCarName(data),
      color: getCarColor(),
    };
    cars.push(car);
  }
  return cars;
}
