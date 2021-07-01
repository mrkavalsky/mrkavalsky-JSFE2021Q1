import { combineReducers } from 'redux';
import { gameModeReducer } from './game-mode-reducer';
import { modeReducer } from './mode-reducer';

export const rootReducer = combineReducers({
  mode: modeReducer,
  gameMode: gameModeReducer,
});
