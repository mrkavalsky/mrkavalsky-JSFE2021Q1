import { combineReducers } from 'redux';
import { menuReducer, pageReducer, themeReducer } from './reducer';

export const rootReducer = combineReducers({
  theme: themeReducer,
  menu: menuReducer,
  page: pageReducer,
});
