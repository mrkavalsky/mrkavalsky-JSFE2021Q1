import { renderCategoryPage } from '../components/category-page/category-page';
import { store } from './store';

export const changePage = (): void => {
  document.body.lastElementChild?.remove();

  const {
    page: { value },
  } = store.getState();

  renderCategoryPage(value);
};
