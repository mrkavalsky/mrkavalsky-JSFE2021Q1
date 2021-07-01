import { store } from '../../reducers/core/store';
import './styles.css';
import { renderBurgerMenu, toggleBurgerMenu } from './burger-menu';
import { createHTMLElement } from '../../helpers/create-html-element';
import { Mode } from '../../types/modes';
import { changeMode } from '../../actions/actions';
import { Theme } from './classes';
import { changeHash } from '../../router/change-hash';
import { MAIN_PAGE } from '../main-page/config';

export const changeBodyClass = (mode: string): void => {
  document.body.className =
    mode === Mode.TRAIN ? Theme.THEME_TRAIN : Theme.THEME_PLAY;
};

const changeCheckboxLabel = (mode: string): void => {
  const label = document.getElementById('checkbox-label');

  if (label) {
    label.textContent = mode;
  }
};

const addHandlers = (): void => {
  const checkbox = document.getElementById('flexSwitchCheckDefault');
  const menuButton = document.getElementById('menu-button');
  const logo = document.getElementById('logo');

  checkbox?.addEventListener('click', () => {
    const newMode =
      store.getState().mode.value === Mode.TRAIN ? Mode.PLAY : Mode.TRAIN;

    changeCheckboxLabel(newMode);
    changeMode(newMode);
  });
  menuButton?.addEventListener('click', () => toggleBurgerMenu());
  logo?.addEventListener('click', () => changeHash(MAIN_PAGE));
};

export const renderHeader = (): void => {
  const header = createHTMLElement(`
    <header class="header">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a id="logo" class="navbar-brand navbar-brand_pointer">English For Kids</a>
          <div class="form-check form-switch">
            <input class="form-check-input" role="button" type="checkbox" id="flexSwitchCheckDefault">
            <label class="form-check-label form-check-label_1-5rem ms-1" 
                    id="checkbox-label" 
                    for="flexSwitchCheckDefault">TRAIN</label>
          </div>
          <button class="navbar-toggler"
                  id="menu-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarColor01"
                  aria-controls="navbarColor01"
                  aria-expanded="false"
                  aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
    </header>
  `);

  document.body.append(header);

  renderBurgerMenu();

  addHandlers();
};
