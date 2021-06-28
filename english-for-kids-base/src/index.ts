import 'bootstrap/dist/css/bootstrap.min.css';
import { renderApp } from './components/renderApp';
import './styles.css';
import { store } from './reducers/core/store';
import { addRouting } from './router/add-routing';
import {
  changeBodyClass,
  changeCheckboxLabel,
} from './components/header/header';

const initApp = (): void => {
  renderApp();

  addRouting();

  let prevState = store.getState();

  store.subscribe(() => {
    const { mode } = store.getState();

    if (mode.value !== prevState.mode.value) {
      changeBodyClass(mode.value);
      changeCheckboxLabel(mode.value);
    }

    prevState = store.getState();
  });
};

window.addEventListener('load', initApp);
