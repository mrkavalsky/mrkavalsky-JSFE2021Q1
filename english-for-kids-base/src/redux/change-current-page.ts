import { renderCategoryPage } from '../components/category-page/category-page';
import { MAIN_PAGE } from '../components/main-page/config';
import { renderMainPage } from '../components/main-page/main-page';

export const changeCurrentPage = (hash: string): void => {
  document.body.lastElementChild?.remove();

  if (hash === MAIN_PAGE) {
    renderMainPage();
  } else {
    renderCategoryPage(hash);
  }
};
