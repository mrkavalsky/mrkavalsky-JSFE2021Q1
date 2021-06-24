import { combineReducers } from 'redux';
import { CHANGE_THEME } from './types';
import { IAction, IState } from '../interfaces';
import { THEME_TRAIN } from './themes';

const initialTheme = {
  value: THEME_TRAIN,
};

const themeReducer = (state: IState = initialTheme, {type, payload}: IAction) => {
  switch (type) {
    case CHANGE_THEME:
      return { ...state, value: payload };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  theme: themeReducer,
});
