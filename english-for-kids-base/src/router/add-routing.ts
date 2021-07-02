import { MAIN_PAGE } from '../components/main-page/config';
import { changeCurrentPage } from './change-current-page';
import { getHash } from './get-hash';

export const addRouting = (): void => {
  const hash = getHash();

  if (!hash) {
    window.location.hash = MAIN_PAGE;
  }
  changeCurrentPage(hash);

  window.onpopstate = () => changeCurrentPage(getHash());
};
