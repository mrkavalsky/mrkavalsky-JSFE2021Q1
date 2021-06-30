import { Mode } from '../types/modes';

const initialState = {
  mode: {
    value: Mode.TRAIN,
  },
  game: {
    isGameStarted: false,
  },
};

export default initialState;
