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

export interface IAction {
  type: string;
  [keys: string]: string;
}

export interface IModeState {
  value: string;
}

export interface IModeAction {
  type: string;
  payload: string;
}

export interface IGameState {
  isGameStarted: boolean;
  currentCards?: ICardInfo[];
  currentCard?: ICardInfo;
}

export interface IGameAction {
  type: string;
  payload: {
    isGameStarted: boolean;
    cards?: ICardInfo[];
    card?: ICardInfo;
  };
}
