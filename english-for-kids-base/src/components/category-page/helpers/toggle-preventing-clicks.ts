import { CATEGORY_PAGE_DISABLE } from '../classes';

export const togglePreventingClicks = (): void => {
  const page = document.getElementById('category-page');

  page?.classList.toggle(CATEGORY_PAGE_DISABLE);
};
