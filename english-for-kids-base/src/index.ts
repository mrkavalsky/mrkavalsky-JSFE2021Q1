import 'bootstrap/dist/css/bootstrap.min.css';
import { renderApp } from './components/renderApp';
import './styles.css';
import { store } from './reducers/core/store';
import { addRouting } from './router/add-routing';
import { changeBodyClass } from './components/header';
import { changeStartGameButton } from './components/category-page';
import initialState from './reducers/initial-state';

const initApp = (): void => {
  renderApp();

  addRouting();

  let prevState = initialState;

  store.subscribe(() => {
    const state = store.getState();
    const {
      mode: { value },
      gameMode: { isGameStarted },
    } = state;

    if (value !== prevState.mode.value) {
      changeBodyClass(value);
    } else if (
      isGameStarted &&
      isGameStarted !== prevState.gameMode.isGameStarted
    ) {
      changeStartGameButton();
    }

    prevState = state;
  });
};

window.addEventListener('load', initApp);
