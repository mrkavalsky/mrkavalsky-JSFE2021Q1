import initialState from './initial-state';
import { ActionTypes } from '../actions/action-types';

export const modeReducer = (
  state: any = initialState.mode,
  { type, payload }: any,
): any => {
  switch (type) {
    case ActionTypes.CHANGE_MODE:
      return { ...state, value: payload };
    default:
      return state;
  }
};
