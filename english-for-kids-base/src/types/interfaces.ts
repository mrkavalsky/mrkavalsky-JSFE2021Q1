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

export interface IAction<T> {
  type: string;
  payload: T;
}

export interface IModeState {
  value: string;
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
  statistics: IStatisticsState;
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

export interface IStatisticsAction {
  type: string;
  payload: {
    currentCards?: IGameWord[];
    currentCard?: IGameWord;
  };
}

export interface IStatisticsState {
  currentCards: IGameWord[];
  currentCard: IGameWord;
}

export interface ICustomTarget extends EventTarget {
  id: string;
  nodeName: string;
}
