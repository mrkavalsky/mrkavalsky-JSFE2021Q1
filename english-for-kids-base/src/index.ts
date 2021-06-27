import 'bootstrap/dist/css/bootstrap.min.css';
import { initDefaultStore } from './actions/actions';
import { renderApp } from './components/renderApp';
import './styles.css';
import { store } from './redux/store';
import { changePage } from './redux/change-page';

const initApp = (): void => {
  renderApp();
  initDefaultStore();
  store.subscribe(() => {
    changePage();
  });
};

window.addEventListener('load', initApp);
