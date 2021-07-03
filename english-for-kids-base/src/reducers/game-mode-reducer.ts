import { GAME_STATE } from '../actions/action-types';
import { IAction, IGameModeState } from '../types/interfaces';
import initialState from './initial-state';

export const gameModeReducer = (
  state: IGameModeState = initialState.gameMode,
  { type, payload }: IAction<boolean>,
): IGameModeState => {
  switch (type) {
    case GAME_STATE:
      return {
        ...state,
        isGameStarted: payload,
      };
    default:
      return state;
  }
};
