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
