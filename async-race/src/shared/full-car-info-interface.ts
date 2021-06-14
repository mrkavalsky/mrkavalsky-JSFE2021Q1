import { ICar } from './car-interface';
import { IWinner } from './winner-interface';

export interface IFullCarInfo extends ICar, IWinner {}
