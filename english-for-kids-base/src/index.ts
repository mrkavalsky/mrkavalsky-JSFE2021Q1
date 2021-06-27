import 'bootstrap/dist/css/bootstrap.min.css';
import { initApp } from './actions/actions';
import { store } from './redux/store';
import { renderApp } from './components/renderApp';
import './styles.css';

export const app = (): void => {
  renderApp();
  store.dispatch(initApp());
};
