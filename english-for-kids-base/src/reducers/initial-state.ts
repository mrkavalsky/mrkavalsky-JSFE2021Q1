import { IStore } from '../types/interfaces';
import { Mode } from '../types/modes';

const initialState: IStore = {
  mode: {
    value: Mode.TRAIN,
  },
  gameMode: {
    isGameStarted: false,
  },
  statistics: {
    currentCards: [],
    currentCard: {
      word: '',
      audioSrc: '',
      train: 0,
      isHit: false,
      miss: 0,
    },
  },
};

export default initialState;
