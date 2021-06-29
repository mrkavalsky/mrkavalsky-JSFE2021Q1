import { ActionTypes } from '../actions/action-types';
import { Mode } from '../types/modes';

const initialState = {
  mode: {
    value: Mode.TRAIN,
  },
  game: {
    value: ActionTypes.RESET_GAME,
  },
};

export default initialState;
