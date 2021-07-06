import { config } from './config';
import { getHash } from './get-hash';

export const changeCurrentPage = (): void => {
  document.body.lastElementChild?.remove();

  const hash = getHash();
  const [page] = hash.split('_');
  const renderPage = config[page];

  renderPage();
};
