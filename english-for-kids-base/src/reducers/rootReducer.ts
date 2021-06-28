import { combineReducers } from 'redux';
import { themeReducer } from './reducer';

export const rootReducer = combineReducers({
  theme: themeReducer,
});
