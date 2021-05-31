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

  private aboutGamePage: AboutGamePage = new AboutGamePage();

  private settingsPage: SettingsPage = new SettingsPage();

  private appPages: BasePage[] = [
    this.aboutGamePage,
    this.bestScorePage,
    this.settingsPage,
    this.gamePage,
  ];

  private rootChildren: BaseComponent[] = [];

  private header: Header = new Header();

  private currentUser: IUser | null = null;

  private isGameStart = false;

  constructor(readonly rootElement: HTMLElement) {
    this.appendComponents([this.header, this.scorePopup, this.aboutGamePage]);
    window.onpopstate = () => {
      this.changeRout();
    };
    this.loadStartRoute();
    this.header.registerButton.element.addEventListener('click', () => {
      document.body.append(this.popup.element);
    });
    this.popup.form.submitButton.element.addEventListener(
      'click',
      (e: MouseEvent) => {
        this.enterToAccount(e);
      },
    );
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
    this.header.startGameButton.element.addEventListener('click', () => {
      this.gameCycle();
    });
  }

  appendComponents(components: BaseComponent[]): void {
    components.forEach((e: BaseComponent): void => {
      this.rootElement.append(e.element);
    });
    this.rootChildren = this.rootChildren.concat(components);
  }

  removeComponent(): void {
    this.rootElement.lastElementChild?.remove();
    this.rootChildren.pop();
  }

  loadStartRoute(): void {
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
    if (
      currentRouteName !== 'start-game' &&
      this.currentUser &&
      this.isGameStart
    ) {
      this.header.stopGameButton.element.click();
    }
    this.header.clickOnNavButton(currentRouteName);
    this.removeComponent();
    this.appendComponents([currentRoute]);
  }

  async enterToAccount(e: MouseEvent): Promise<void> {
    e.preventDefault();
    const user: IUser | void = await this.popup.form.submitForm();
    if (!user) return;
    this.currentUser = user;
    this.header.showStartGameButton();
    this.header.showUserAvatar(user.avatar);
    this.indexDB.sendDataToScoreBlock();
  }

  async gameCycle(): Promise<void> {
    this.isGameStart = true;
    if (!(await this.gamePage.startGame())) return;
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
    this.indexDB.addToScore(this.currentUser);
  }
}
