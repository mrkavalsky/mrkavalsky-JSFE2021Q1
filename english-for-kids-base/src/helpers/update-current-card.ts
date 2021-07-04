import { hitWord, missWord } from '../actions/actions';

export const updateCurrentCard = (compareResult: boolean): void => {
  if (compareResult) {
    hitWord();
  } else {
    missWord();
  }
};
