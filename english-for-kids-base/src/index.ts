import 'bootstrap/dist/css/bootstrap.min.css';
import { renderApp } from './components/renderApp';
import './styles.css';
import { store } from './redux/store';
import { addRouting } from './redux/add-routing';
import { changeBodyClass } from './components/header/header';

const initApp = (): void => {
  renderApp();

  addRouting();

  let prevState = store.getState();

  store.subscribe(() => {
    const { theme } = store.getState();

    if (theme.value !== prevState.theme.value) {
      changeBodyClass();
    }

    prevState = store.getState();
  });
};

window.addEventListener('load', initApp);
