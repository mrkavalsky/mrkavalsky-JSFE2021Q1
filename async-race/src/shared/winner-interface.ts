export interface INewWinner {
  time: number;
  wins: number;
}

export interface IWinner extends INewWinner {
  id: number;
}
