import { BaseComponent } from './components/base-component';
import { AboutGamePage } from './pages/about-game-page/about-game-page';
import './index.css';
import { BasePage } from './components/base-page';
import { BestScorePage } from './pages/best-score-page/best-score-page';
import { SettingsPage } from './pages/settings-page/settings-page';
import { Header } from './components/header/header';
import { DataBase } from './components/data-base';
import { Popup } from './components/popup/popup';
import { IUser } from './components/user-interface';
import { Game } from './components/game/game';

export class App {
  private bestScorePage: BestScorePage = new BestScorePage();

  private indexDB: DataBase = new DataBase(this.bestScorePage.scoreBlock);

  private popup: Popup = new Popup(this.indexDB);

  private game: Game = new Game();

  public aboutGamePage: AboutGamePage = new AboutGamePage();

  public appPages: BasePage[] = [
    this.aboutGamePage,
    this.bestScorePage,
    new SettingsPage(),
  ];

  public rootChildren: BaseComponent[] = [];

  public header: Header = new Header();

  constructor(readonly rootElement: HTMLElement) {
    this.appendComponent(this.header);
    this.appendComponent(this.aboutGamePage);
    this.bindSettingsButtons();
    this.addRouting();
    this.addShowPopupEvent();
    this.addEnterToAccountEvent();
    this.header.startGameButton.element.addEventListener('click', () => {
      this.startGame();
    });
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

  addShowPopupEvent(): void {
    this.header.RegisterButton.element.addEventListener('click', () => {
      document.body.append(this.popup.element);
    });
  }

  addEnterToAccountEvent(): void {
    this.popup.form.submitButton.element.addEventListener(
      'click',
      (e: MouseEvent) => {
        this.enterToAccount(e);
      },
    );
  }

  enterToAccount(e: MouseEvent): void {
    e.preventDefault();
    const user: IUser | void = this.popup.form.submitForm();
    if (!user) return;
    this.header.showStartGameButton();
    this.indexDB.addBestScoreArray();
  }
  
  startGame(): void {
    this.removeComponent();
    this.appendComponent(this.game);
  }
}
