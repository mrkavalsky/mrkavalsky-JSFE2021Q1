import { changeMode, changeGameMode } from '../../../actions/actions';
import { store } from '../../../reducers/core/store';
import { Mode } from '../../../types/modes';

const changeCheckboxLabel = (mode: string): void => {
  const label = document.getElementById('checkbox-label');

  if (label) {
    label.textContent = mode;
  }
};

const endGame = (isGameStarted: boolean): void => {
  if (isGameStarted) {
    changeGameMode(!isGameStarted);
  }
};

export const runCheckBoxHandlers = (): void => {
  const newMode =
    store.getState().mode.value === Mode.TRAIN ? Mode.PLAY : Mode.TRAIN;
  const {
    gameMode: { isGameStarted },
  } = store.getState();

  changeCheckboxLabel(newMode);
  changeMode(newMode);
  endGame(isGameStarted);
};
