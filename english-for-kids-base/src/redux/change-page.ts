import { renderCategoryPage } from '../components/category-page/category-page';
import { MAIN_PAGE } from '../components/main-page/config';
import { renderMainPage } from '../components/main-page/main-page';
import { store } from './store';

export const changePage = (): void => {
  document.body.lastElementChild?.remove();

  const {
    page: { value },
  } = store.getState();

  if (value === MAIN_PAGE) renderMainPage();
  else renderCategoryPage(value);
};
