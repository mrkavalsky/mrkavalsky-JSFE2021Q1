import { App } from './app';
import { Header } from './components/header/header';
import './index.css';

window.addEventListener('DOMContentLoaded', () => {
  const matchMatchGameApp: App = new App(document.body);
  matchMatchGameApp.appendComponent(new Header());
})