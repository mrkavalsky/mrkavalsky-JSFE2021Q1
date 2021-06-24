export interface ICardInfo {
  word: string;
  translation: string;
  image: string;
  audioSrc: string;
}

export interface ICards {
  category: string;
  cards: ICardInfo[];
}

export interface IAction {
  type: string;
  [keys: string]: string;
}

export interface IState {
  [key: string]: string;
}

export interface IMenuState {
  isHidden: boolean;
}

export interface IMenuAction {
  type: string;
  payload: boolean;
}
