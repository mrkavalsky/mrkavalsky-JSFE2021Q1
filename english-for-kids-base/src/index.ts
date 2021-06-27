import 'bootstrap/dist/css/bootstrap.min.css';
import { initDefaultStore } from './actions/actions';
import { renderApp } from './components/renderApp';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const initApp = (): void => {
  renderApp();
  initDefaultStore();
};

window.addEventListener('load', initApp);