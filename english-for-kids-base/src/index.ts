import 'bootstrap/dist/css/bootstrap.min.css';
import { renderApp } from './components/renderApp';
import './styles.css';
import { store } from './reducers/core/store';
import { addRouting } from './router/add-routing';
import { changeBodyClass, changeCheckboxLabel } from './components/header';
import { changeStartGameButton } from './components/category-page';
import { playAudio } from './helpers/play-audio';
import { START_GAME } from './actions/action-types';

const initApp = (): void => {
  renderApp();

  addRouting();

  let prevState = store.getState();

  store.subscribe(() => {
    const { mode, game } = store.getState();

    if (mode.value !== prevState.mode.value) {
      changeBodyClass(mode.value);
      changeCheckboxLabel(mode.value);
    } else if (
      game.value === START_GAME &&
      game.value !== prevState.game.value
    ) {
      changeStartGameButton();
      playAudio(game.currentCard.audioSrc);
    }

    prevState = store.getState();
  });
};

window.addEventListener('load', initApp);
