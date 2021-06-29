import { renderHeader } from './header';
import { renderMainPage } from './main-page';

export const renderApp = (): void => {
  renderHeader();
  renderMainPage();
};
