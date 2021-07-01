import { combineReducers } from 'redux';
import { gameModeReducer } from './game-mode-reducer';
import { modeReducer } from './mode-reducer';
import { statisticReducer } from './statistic-reducer';

export const rootReducer = combineReducers({
  mode: modeReducer,
  gameMode: gameModeReducer,
  statistic: statisticReducer,
});
