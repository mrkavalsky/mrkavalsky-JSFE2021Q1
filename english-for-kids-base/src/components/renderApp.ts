import { renderHeader } from './header/header';
import { renderMainPage } from './main-page/main-page';

export const renderApp = (): void => {
  renderHeader();
  renderMainPage();
};
