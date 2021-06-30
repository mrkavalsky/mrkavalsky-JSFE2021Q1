import { RESET_GAME } from '../actions/action-types';
import { Mode } from '../types/modes';

const initialState = {
  mode: {
    value: Mode.TRAIN,
  },
  game: {
    value: RESET_GAME,
  },
};

export default initialState;
