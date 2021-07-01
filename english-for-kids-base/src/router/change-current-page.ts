import { config } from './config';

export const changeCurrentPage = (hash: string): void => {
  document.body.lastElementChild?.remove();

  const [page] = hash.split('_');

  config[page]();
};
