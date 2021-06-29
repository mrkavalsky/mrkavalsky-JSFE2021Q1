import { combineReducers } from 'redux';
import { gameReducer } from './game-reducer';
import { modeReducer } from './mode-reducer';

export const rootReducer = combineReducers({
  mode: modeReducer,
  game: gameReducer,
});
