import './app.css';
import { Header } from './components/header';
import { BasePage } from './shared/base-page';

export class App {
  private garagePage = new BasePage('garage-page');

  private winnersPage = new BasePage('winners-page');

  constructor(private rootElement: HTMLElement) {
    const header: Header = new Header(rootElement);
    rootElement.append(header.node);
    rootElement.append(this.garagePage.node);
  }
}
