export interface ICardInfo {
  word: string;
  translation: string;
  image: string;
  audioSrc: string;
  train: number;
  hit: number;
  miss: number;
}

export interface ICards {
  category: string;
  hash: string;
  cardsList: ICardInfo[];
}

export interface IStatisticsCard {
  category: string;
  word: string;
  translation: string;
  train: number;
  hit: number;
  miss: number;
  errors: number;
}

export interface IStatistics {
  getValue(): IStatisticsCard[];
  setValue(value: IStatisticsCard[]): void;
}

export interface ICardControl {
  getValue(): ICards[];
  setValue(value: ICards[]): void;
}

export interface INewCategory {
  categoryName: string;
  isUserLogin: boolean;
}
