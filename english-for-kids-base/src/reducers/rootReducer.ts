import { combineReducers } from 'redux';
import { menuReducer, themeReducer } from './reducer';

export const rootReducer = combineReducers({
  theme: themeReducer,
  menu: menuReducer,
});
