import { BasePage } from '../../shared/base-page';
import './settings-page.css';

export class SettingsPage extends BasePage {
  constructor() {
    super('main', ['settings'], [], 'game-settings');
  }
}
