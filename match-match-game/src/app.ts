import { BaseComponent } from './components/base-component';
import { AboutGamePage } from './pages/about-game-page/about-game-page';
import './index.css';
import { BasePage } from './components/base-page';
import { BestScorePage } from './pages/best-score-page/best-score-page';
import { SettingsPage } from './pages/settings-page/settings-page';
import { Header } from './components/header/header';

export class App {
  constructor(
    readonly rootElement: HTMLElement,
    public rootChildren: BaseComponent[] = [],
    public header: Header = new Header(),
    public aboutGamePage: AboutGamePage = new AboutGamePage(),
    public appPages: BasePage[] = [
      aboutGamePage,
      new BestScorePage(),
      new SettingsPage(),
    ],
  ) {
    this.appendComponent(header);
    this.appendComponent(aboutGamePage);
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
