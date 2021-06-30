import { CHANGE_MODE } from '../actions/action-types';
import { IModeAction, IModeState } from '../types/interfaces';
import initialState from './initial-state';

export const modeReducer = (
  state: IModeState = initialState.mode,
  { type, payload }: IModeAction,
): IModeState => {
  switch (type) {
    case CHANGE_MODE:
      return { ...state, value: payload };
    default:
      return state;
  }
};
