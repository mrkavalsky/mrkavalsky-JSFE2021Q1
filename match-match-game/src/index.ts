import { App } from './app';
import { BaseBlock } from './components/base-block';
import './index.css';

window.addEventListener('DOMContentLoaded', () => {
  const matchMatchApp: App = new App(document.body);
  matchMatchApp.appendComponent(new BaseBlock('header', ['header']));
})