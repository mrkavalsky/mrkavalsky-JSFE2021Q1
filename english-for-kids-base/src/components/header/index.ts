import './styles.css';
import { renderBurgerMenu } from './burger-menu';
import { createHTMLElement } from '../../helpers/create-html-element';
import { Mode } from '../../types/modes';
import { ICustomTarget } from '../../types/interfaces';
import { config } from './config';
import { Theme } from './classes';

export const changeBodyClass = (mode: string): void => {
  document.body.className =
    mode === Mode.TRAIN ? Theme.THEME_TRAIN : Theme.THEME_PLAY;
};

const addHandlers = (header: Element): void => {
  header.addEventListener('click', ({ target }) => {
    if (target) {
      const { id } = target as ICustomTarget;
      const runHandler = config[id];

      if (runHandler) {
        runHandler();
      }
    }
  });
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
          </button>
        </div>
      </nav>
    </header>
  `);

  document.body.append(header);

  renderBurgerMenu();

  addHandlers(header);
};
