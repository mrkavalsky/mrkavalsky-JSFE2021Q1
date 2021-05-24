import { BaseComponent } from './shared/base-component';
import { AboutGamePage } from './pages/about-game-page/about-game-page';
import './index.css';
import { BasePage } from './shared/base-page';
import { BestScorePage } from './pages/best-score-page/best-score-page';
import { SettingsPage } from './pages/settings-page/settings-page';
import { Header } from './components/header/header';
import { DataBase } from './components/data-base';
import { RegistrationPopup } from './components/registration-popup/registration-popup';
import { IUser } from './shared/user-interface';
import { Game } from './pages/game-page/game-page';

export class App {
  private bestScorePage: BestScorePage = new BestScorePage();

  private indexDB: DataBase = new DataBase(this.bestScorePage.scoreBlock);

  private popup: RegistrationPopup = new RegistrationPopup(this.indexDB);

  private gamePage: Game = new Game();

  public aboutGamePage: AboutGamePage = new AboutGamePage();

  public appPages: BasePage[] = [
    this.aboutGamePage,
    this.bestScorePage,
    new SettingsPage(),
    this.gamePage,
  ];

  public rootChildren: BaseComponent[] = [];

  public header: Header = new Header();

  private isUserEnter = false;

  constructor(readonly rootElement: HTMLElement) {
    this.appendComponent(this.header);
    this.appendComponent(this.aboutGamePage);
    this.bindSettingsButtons();
    this.addRouting();
    this.addShowPopupEvent();
    this.addEnterToAccountEvent();
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
      this.changeRout();
    };
    if (window.location.hash === '' || window.location.hash === '#start-game') {
      window.location.hash = 'about-game';
    }
    this.header.clickOnNavButton(window.location.hash.slice(1));
    this.changeRout();
  }

  changeRout(): void {
    const currentRouteName: string = window.location.hash.slice(1);
    const currentRoute: BasePage | undefined = this.appPages.find(
      (p) => p.name === currentRouteName,
    );
    if (!currentRoute) return;
    if (currentRoute instanceof Game && !this.isUserEnter) {
      window.location.hash = 'about-game';
      return;
    }
    if (currentRoute instanceof Game && this.isUserEnter) {
      this.gamePage.startGame();
    }
    if(currentRouteName !== 'start-game' && this.isUserEnter) {
      this.header.showStartGameButton();
    }
    this.header.clickOnNavButton(currentRouteName);
    this.removeComponent();
    this.appendComponent(currentRoute);
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
    this.isUserEnter = true;
    this.header.showStartGameButton();
    this.indexDB.addBestScoreArray();
  }
}
