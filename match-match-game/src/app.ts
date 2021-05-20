import { BaseComponent } from './components/base-component';
import { AboutGamePage } from './pages/about-game-page/about-game-page';
import './index.css';
import { BasePage } from './components/base-page';
import { BestScorePage } from './pages/best-score-page/best-score-page';
import { SettingsPage } from './pages/settings-page/settings-page';
import { Header } from './components/header/header';
import { DataBase } from './components/data-base';

export class App {
  private bestScorePage: BestScorePage = new BestScorePage();
  private indexDB: DataBase = new DataBase(this.bestScorePage.scoreBlock);
  public aboutGamePage: AboutGamePage = new AboutGamePage();
  public appPages: BasePage[] = [
    this.aboutGamePage,
    this.bestScorePage,
    new SettingsPage(),
  ];
  public rootChildren: BaseComponent[] = [];
  public header: Header = new Header();
  constructor(
    readonly rootElement: HTMLElement
  ) {
    this.appendComponent(this.header);
    this.appendComponent(this.aboutGamePage);
    this.bindSettingsButtons();
    this.addRouting();
  }

  appendComponent(block: BaseComponent): void {
    this.rootElement.append(block.element);
    this.rootChildren.push(block);
  }

  removeComponent(): void {
    this.rootElement.lastElementChild?.remove();
    this.rootChildren.pop();
  }

  addRouting(): void {
    window.onpopstate = () => {
      const currentRouteName: string = window.location.hash.slice(1);
      const currentRoute: BasePage | undefined = this.appPages.find(
        (p) => p.name === currentRouteName,
      );
      if (!currentRoute) return;
      this.removeComponent();
      this.appendComponent(currentRoute);
    };
  }

  bindSettingsButtons(): void {
    this.aboutGamePage.settingsButton.element.addEventListener('click', () => {
      this.header.settingsButton.element.click();
    });
  }
}
