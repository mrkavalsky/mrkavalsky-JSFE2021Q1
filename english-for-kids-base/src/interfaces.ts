export interface ICardInfo {
  word: string;
  translation: string;
  image: string;
  audioSrc: string;
}

export interface ICards {
  category: string;
  hash: string;
  cardsList: ICardInfo[];
}

export interface IAction {
  type: string;
  [keys: string]: string;
}

export interface IState {
  value: string;
  isHidden: boolean;
}
