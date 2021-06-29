import { store } from '../../reducers/core/store';
import './header.css';
import { renderBurgerMenu, toggleBurgerMenu } from './burger-menu';
import { createHTMLElement } from '../../helpers/create-html-element';
import { Mode } from '../../types/modes';
import { changeMode } from '../../actions/actions';
import { Theme } from './classes';

export const changeBodyClass = (mode: string): void => {
  document.body.className =
    mode === Mode.TRAIN ? Theme.THEME_TRAIN : Theme.THEME_PLAY;
};

export const changeCheckboxLabel = (mode: string): void => {
  const label = document.getElementById('checkbox-label');

  if (label) {
    label.textContent = mode;
  }
};

const addHandlers = (): void => {
  const checkbox = document.getElementById('flexSwitchCheckDefault');
  const menuButton = document.getElementById('menu-button');

  checkbox?.addEventListener('click', () => {
    const newMode =
      store.getState().mode.value === Mode.TRAIN ? Mode.PLAY : Mode.TRAIN;

    changeMode(newMode);
  });
  menuButton?.addEventListener('click', () => toggleBurgerMenu());
};

export const renderHeader = (): void => {
  const header = createHTMLElement(`
    <header>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand navbar-brand_pointer">English For Kids</a>
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
