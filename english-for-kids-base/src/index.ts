import 'bootstrap/dist/css/bootstrap.min.css';
import { initDefaultStore } from './actions/actions';
import { renderApp } from './components/renderApp';
import './styles.css';

export const initApp = (): void => {
  renderApp();
  initDefaultStore();
};
