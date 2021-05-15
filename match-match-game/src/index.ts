import { App } from './app';
import { BaseBlock } from './components/base-block';
import './index.css';
import { AboutGamePage } from './pages/about-game-page/about-game-page';

window.addEventListener('DOMContentLoaded', () => {
  const matchMatchApp: App = new App(document.body);
  matchMatchApp.appendComponent(new BaseBlock('header', ['header']));
  matchMatchApp.appendComponent(new AboutGamePage());
})