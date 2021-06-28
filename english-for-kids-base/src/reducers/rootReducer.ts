import { combineReducers } from 'redux';
import { pageReducer, themeReducer } from './reducer';

export const rootReducer = combineReducers({
  theme: themeReducer,
  page: pageReducer,
});
