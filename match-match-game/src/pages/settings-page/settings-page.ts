import { SettingsMenu } from '../../components/settings-menu/settings-menu';
import { BasePage } from '../../shared/base-page';
import './settings-page.css';

export class SettingsPage extends BasePage {
  private cardsSettings = new SettingsMenu(
    'Game cards',
    'select game cards type',
    ['cats', 'animals'],
  );

  private difficultySettings = new SettingsMenu(
    'Difficulty',
    'select game type',
    ['4', '6', '8'],
  );

  constructor() {
    super('main', ['settings'], [], 'game-settings');
    this.appendComponents([this.cardsSettings, this.difficultySettings]);
  }

  getSettingsMenu(): HTMLElement[] {
    return [
      this.cardsSettings.getMenuNode(),
      this.difficultySettings.getMenuNode(),
    ];
  }
}
