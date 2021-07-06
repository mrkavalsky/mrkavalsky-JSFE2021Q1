import { updateLocalStorage } from '../../../local-storage';
import { store } from '../../../reducers/core/store';
import { changeHash } from '../../../router/change-hash';
import { getHash } from '../../../router/get-hash';
import { MAIN_PAGE } from '../../main-page/config';

export const runLogoHandlers = (): void => {
  const {
    statistics: { currentCards },
  } = store.getState();
  const currentHash = getHash();

  updateLocalStorage(currentCards, currentHash);
  changeHash(MAIN_PAGE);
};
