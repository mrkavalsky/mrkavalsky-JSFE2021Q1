import 'bootstrap/dist/css/bootstrap.min.css';
import { renderApp } from './components/renderApp';
import './styles.css';
import { store } from './reducers/core/store';
import { addRouting } from './router/add-routing';
import { changeBodyClass } from './components/header';
import { changeStartGameButton } from './components/category-page';
import initialState from './reducers/initial-state';
import { playAudio } from './helpers/play-audio';

const initApp = (): void => {
  renderApp();

  addRouting();

  let prevState = initialState;

  store.subscribe(() => {
    const state = store.getState();
    const {
      mode: { value },
      gameMode: { isGameStarted },
      statistics: {
        currentCard: { word, audioSrc },
      },
    } = state;

    if (value !== prevState.mode.value) {
      changeBodyClass(value);
    }
    if (isGameStarted !== prevState.gameMode.isGameStarted) {
      changeStartGameButton(isGameStarted);
    }
    if (isGameStarted && word !== prevState.statistics.currentCard.word) {
      playAudio(audioSrc);
    }

    prevState = state;
  });
};

window.addEventListener('load', initApp);
