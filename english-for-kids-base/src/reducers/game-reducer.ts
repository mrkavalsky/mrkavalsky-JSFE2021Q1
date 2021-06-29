import { ActionTypes } from '../actions/action-types';
import { IAction } from '../types/interfaces';
import initialState from './initial-state';

export const gameReducer = (
  state: any = initialState.game,
  { type }: IAction,
): any => {
  switch (type) {
    case ActionTypes.START_GAME:
      return { ...state, value: ActionTypes.START_GAME };
    case ActionTypes.END_GAME:
      return { ...state, value: ActionTypes.END_GAME };
    case ActionTypes.RESET_GAME:
      return { ...state, value: ActionTypes.RESET_GAME };
    default:
      return state;
  }
};
