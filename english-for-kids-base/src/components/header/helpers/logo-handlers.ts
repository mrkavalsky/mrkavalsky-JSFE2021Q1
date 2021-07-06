import { changeGameMode, resetCurrentCards } from '../../../actions/actions';
import { updateLocalStorage } from '../../../local-storage';
import { store } from '../../../reducers/core/store';
import { changeHash } from '../../../router/change-hash';
import { MAIN_PAGE } from '../../main-page/config';

export const runLogoHandlers = (): void => {
  const {
    gameMode: { isGameStarted },
    statistics: { currentCards },
  } = store.getState();

  updateLocalStorage(currentCards);
  resetCurrentCards();
  changeHash(MAIN_PAGE);

  if (isGameStarted) {
    changeGameMode(!isGameStarted);
  }
};
