import { config } from './config';
import { getHash } from './get-hash';

export const changeCurrentPage = (): void => {
  const currentPage =
    document.getElementById('page') || document.getElementById('category-page');
  const hash = getHash();
  const [page] = hash.split('_');
  const renderPage = config[page];

  currentPage?.remove();
  renderPage();
};
