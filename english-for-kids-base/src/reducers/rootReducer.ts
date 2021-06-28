import { combineReducers } from 'redux';
import { themeReducer } from './mode-reducer';

export const rootReducer = combineReducers({
  theme: themeReducer,
});
