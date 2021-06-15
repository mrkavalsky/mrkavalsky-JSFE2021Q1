import { INewCar } from '../shared/car-interface';
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

export async function getCars(): Promise<INewCar[]> {
  const response: Response = await fetch('./car-models.json');
  const data: ICarModel[] = await response.json();
  return [...new Array(100)].map(() => {
    return {
      name: getCarName(data),
      color: getCarColor(),
    };
  });
}
