import { IStore } from '../types/interfaces';
import { Mode } from '../types/modes';

const initialState: IStore = {
  mode: {
    value: Mode.TRAIN,
  },
  game: {
    isGameStarted: false,
  },
};

export default initialState;
