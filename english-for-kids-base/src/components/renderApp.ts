import { renderBurgerMenu } from './header/burger-menu/burger-menu';
import { renderHeader } from './header/header';
import { renderMainPage } from './main-page/main-page';

export const renderApp = (): void => {
  renderHeader();
  renderBurgerMenu();
  renderMainPage();
};
