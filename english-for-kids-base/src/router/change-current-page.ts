import { config } from './config';
import { getHash } from './get-hash';

export const changeCurrentPage = (): void => {
  const header = document.getElementById('header');
  const currentPage =
    document.getElementById('page') || document.getElementById('category-page');
  const hash = getHash();
  const [page] = hash.split('_');
  const renderPage = config[page];

  currentPage?.remove();
  header?.after(renderPage());
};
