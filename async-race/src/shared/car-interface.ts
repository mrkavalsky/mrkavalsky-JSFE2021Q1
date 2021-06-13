export interface INewCar {
  name: string;
  color: string;
}

export interface ICar extends INewCar {
  id: number;
}
