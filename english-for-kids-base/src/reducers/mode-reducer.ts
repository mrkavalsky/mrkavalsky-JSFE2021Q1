import { CHANGE_MODE } from '../actions/action-types';
import initialState from './initial-state';

export const modeReducer = (
  state: any = initialState.mode,
  { type, payload }: any,
): any => {
  switch (type) {
    case CHANGE_MODE:
      return { ...state, value: payload };
    default:
      return state;
  }
};
