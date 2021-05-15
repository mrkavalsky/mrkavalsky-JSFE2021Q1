import { BaseBlock } from './components/base-block';
import { BaseComponent } from './components/base-component';
import { AboutGamePage } from './pages/about-game-page/about-game-page';
import './index.css';
import { BasePage } from './components/base-page';
import { BestScorePage } from './pages/best-score-page/best-score-page';
import { SettingsPage } from './pages/settings-page/settings-page';

export class App {
  constructor(
    readonly rootElement: HTMLElement,
    public rootChildren: BaseComponent[] = [],
    public appPages: BasePage[] = [
      new AboutGamePage(),
      new BestScorePage(),
      new SettingsPage(),
    ],
  ) {
    this.appendComponent(new BaseBlock('header', ['header']));
    this.appendComponent(new AboutGamePage());
    this.addCurrentRootEvent();
  }

  appendComponent(block: BaseComponent): void {
    this.rootElement.append(block.element);
    this.rootChildren.push(block);
  }

  removeComponent(): void {
    this.rootElement.lastElementChild?.remove();
    this.rootChildren.pop();
  }

  addCurrentRootEvent(): void {
    window.onpopstate = () => {
      const currentRouteName: string = window.location.hash.slice(1);
      const currentRoute: BasePage | undefined = this.appPages.find(
        (p) => p.name === currentRouteName,
      );
      if (!currentRoute) return;
      this.removeComponent();
      this.appendComponent(currentRoute);
    };
    window.location.hash = this.appPages[0].name;
  }
}
