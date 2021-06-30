import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import initialState from '../initial-state';
import { rootReducer } from '../root-reducer';

const initStore = () => {
  return createStore(rootReducer, initialState, composeWithDevTools());
};

export const store = initStore();
