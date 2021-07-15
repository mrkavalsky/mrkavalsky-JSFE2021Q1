import { ICardInfo } from '../types/interfaces';

export const ASC_SORT = 'asc';
export const DESC_SORT = 'desc';
export const DIFFICULT_WORDS = 'errors';
export const BASE_CARD: ICardInfo = {
  word: '',
  audioSrc: '',
  translation: '',
  train: 0,
  hit: 0,
  miss: 0,
  image: '',
};
