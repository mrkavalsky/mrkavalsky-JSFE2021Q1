import initialState from './initial-state';
import { IAction } from '../types/interfaces';
import { CHANGE_MODE } from '../actions/action-types';

export const modeReducer = (
  state: any = initialState.mode,
  { type, payload }: IAction,
): any => {
  switch (type) {
    case CHANGE_MODE:
      return { ...state, value: payload };
    default:
      return state;
  }
};
