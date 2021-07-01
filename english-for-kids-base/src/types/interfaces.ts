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

export interface IGameModeState {
  isGameStarted: boolean;
}

export interface IGameModeAction {
  type: string;
  payload: boolean;
}

export interface IStore {
  mode: IModeState;
  gameMode: IGameModeState;
}

export interface IConfig {
  [keys: string]: () => void;
}

export interface IGameWord {
  word: string;
  audioSrc: string;
  train: number;
  isHit: boolean;
  miss: number;
}

export interface IStatisticAction {
  type: string;
  payload: {
    currentCards?: IGameWord[];
    currentCard: IGameWord;
  };
}

export interface IStatisticState {
  currentCards: IGameWord[];
  currentCard: IGameWord;
}
