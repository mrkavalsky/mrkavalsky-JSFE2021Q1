import { renderCategoryPage } from '../components/category-page/category-page';
import { store } from './store';

export const changePage = () => {
  document.body.lastElementChild?.remove();

  const {
    page: { value },
  } = store.getState();

  renderCategoryPage(value);
};
