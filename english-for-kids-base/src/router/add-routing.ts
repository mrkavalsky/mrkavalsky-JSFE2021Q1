import { MAIN_PAGE } from '../components/main-page/config';
import { changeCurrentPage } from './change-current-page';
import { getHash } from './get-hash';

export const addRouting = (): void => {
  window.location.hash = MAIN_PAGE;
  window.onpopstate = () => changeCurrentPage(getHash());
};
