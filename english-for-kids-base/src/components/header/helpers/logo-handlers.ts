import { changeGameMode, resetCurrentCards } from '../../../actions/actions';
import { updateLocalStorage } from '../../../local-storage';
import { store } from '../../../reducers/core/store';
import { changeHash } from '../../../router/change-hash';
import { MAIN_PAGE } from '../../main-page/config';
import { ACTIVE_MODE } from '../burger-menu/classes';

export const runLogoHandlers = (): void => {
  const {
    gameMode: { isGameStarted },
    statistics: { currentCards },
  } = store.getState();
  const background = document.getElementById('burger-menu-wrapper__background');
  const menuList = document.getElementById('burger-menu__list');
  const logo = document.getElementById('logo');

  if (menuList) {
    [...menuList.children].forEach((item) =>
      item.classList.remove(ACTIVE_MODE),
    );
  }
  logo?.classList.add(ACTIVE_MODE);

  updateLocalStorage(currentCards);
  resetCurrentCards();
  changeHash(MAIN_PAGE);

  if (isGameStarted) {
    changeGameMode(!isGameStarted);
  }

  background?.click();
};
