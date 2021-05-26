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
import { ScorePopup } from './components/score-popup/score-popup';

export class App {
  private bestScorePage: BestScorePage = new BestScorePage();

  private indexDB: DataBase = new DataBase(this.bestScorePage.scoreBlock);

  private popup: RegistrationPopup = new RegistrationPopup(this.indexDB);

  private scorePopup: ScorePopup = new ScorePopup();

  private gamePage: Game = new Game();

  public aboutGamePage: AboutGamePage = new AboutGamePage();

  private settingsPage: SettingsPage = new SettingsPage();

  public appPages: BasePage[] = [
    this.aboutGamePage,
    this.bestScorePage,
    this.settingsPage,
    this.gamePage,
  ];

  public rootChildren: BaseComponent[] = [];

  public header: Header = new Header();

  private currentUser: IUser | null = null;

  private isGameStart: boolean = false;

  constructor(readonly rootElement: HTMLElement) {
    this.appendComponent(this.header);
    this.appendComponent(this.scorePopup);
    this.appendComponent(this.aboutGamePage);
    this.bindSettingsButtons();
    this.addRouting();
    this.addShowPopupEvent();
    this.addEnterToAccountEvent();
    const [cardType, difficulty] = this.settingsPage.getSettingsMenu();
    cardType.addEventListener('change', () =>
      this.gamePage.setCardType(cardType),
    );
    difficulty.addEventListener('change', () =>
      this.gamePage.setDifficulty(difficulty),
    );
    this.header.stopGameButton.element.addEventListener('click', () => {
      this.stopGame();
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
    if (currentRoute instanceof Game && !this.currentUser) {
      window.location.hash = 'about-game';
      return;
    }
    if (currentRoute instanceof Game && this.currentUser) {
      this.gameCycle();
    }
    if (currentRouteName !== 'start-game' && this.currentUser && this.isGameStart) {
      this.header.stopGameButton.element.click();
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
    this.currentUser = user;
    this.header.showStartGameButton();
    this.indexDB.addBestScoreArray();
  }

  async gameCycle(): Promise<void> {
    this.isGameStart = true;
    if (!await this.gamePage.startGame()) return;
    if (!this.isGameStart) return;
    this.stopGame();
    this.scorePopup.showPopup(this.gamePage.stopwatch.getTextContent());
  }

  stopGame(): void {
    this.isGameStart = false;
    if (!this.currentUser) return;
    const [pairs, time]: number[] = this.gamePage.stopGame();
    const result: number = pairs * 100 - time * 10;
    this.currentUser.score =
      result > this.currentUser.score ? result : this.currentUser.score;
    this.indexDB.addScore(this.currentUser);
  }
}
