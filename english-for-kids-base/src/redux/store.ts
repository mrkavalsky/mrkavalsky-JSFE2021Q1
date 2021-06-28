import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import initialState from '../initial-state';
import { rootReducer } from '../reducers/rootReducer';

const initStore = () => {
  return createStore(rootReducer, initialState, composeWithDevTools());
};

export const store = initStore();
