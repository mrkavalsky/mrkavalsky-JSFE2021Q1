import { GAME_STATE } from '../actions/action-types';
import { IGameAction, IGameState } from '../types/interfaces';
import initialState from './initial-state';

export const gameReducer = (
  state: IGameState = initialState.game,
  { type, payload }: IGameAction,
): IGameState => {
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
