import { changePage } from '../actions/actions';
import { MAIN_PAGE } from '../components/main-page/config';

export const changeHash = (hash: string): void => {
  window.location.hash = hash;
};

export const addRouting = (): void => {
  window.location.hash = MAIN_PAGE;
  window.onpopstate = () => changePage(window.location.hash.slice(1));
};
