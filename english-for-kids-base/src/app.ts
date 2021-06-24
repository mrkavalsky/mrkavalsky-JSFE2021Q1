import 'bootstrap/dist/css/bootstrap.min.css';
import { initScripts } from './components/initScripts';
import { initApp } from './redux/actions';
import { store } from './redux/store';
import { renderApp } from './render/renderApp';
import './styles.css';

export const app = (): void => {
  renderApp();
  initScripts();
  store.dispatch(initApp());
};
