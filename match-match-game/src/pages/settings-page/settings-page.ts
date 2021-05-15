import { BasePage } from "../../components/base-page";
import './settings-page.css';

export class SettingsPage extends BasePage {
  constructor() {
    super('main', ['settings'], [], 'settings');
  }
}