import 'bootstrap/dist/css/bootstrap.min.css';
import { renderApp } from './components/renderApp';
import './styles.css';
import { store } from './reducers/core/store';
import { addRouting } from './router/add-routing';
import { changeBodyClass } from './components/header';
import { changeStartGameButton } from './components/category-page';
import { playAudio } from './helpers/play-audio';
import { START_GAME } from './actions/action-types';
import initialState from './reducers/initial-state';

const initApp = (): void => {
  renderApp();

  addRouting();

  let prevState = initialState;

  store.subscribe(() => {
    const state = store.getState();
    const { mode, game } = state;

    if (mode.value !== prevState.mode.value) {
      changeBodyClass(mode.value);
    } else if (
      game.value === START_GAME &&
      game.value !== prevState.game.value
    ) {
      changeStartGameButton();
      playAudio(game.currentCard.audioSrc);
    }

    prevState = state;
  });
};

window.addEventListener('load', initApp);
