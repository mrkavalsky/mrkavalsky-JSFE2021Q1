import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from '../reducers/reducer';

const initStore = () => {
  return createStore(rootReducer, composeWithDevTools());
};

export const store = initStore();
