import { changeTheme } from '../../actions/actions';
import { store } from '../../reducers/core/store';
import './header.css';
import { renderBurgerMenu, toggleBurgerMenu } from './burger-menu/burger-menu';
import { Theme } from './classes';

export const changeBodyClass = (): void => {
  const { theme } = store.getState();

  document.body.className = theme.value;
};

const addHandlers = (): void => {
  const checkbox = document.getElementById('flexSwitchCheckDefault');
  const menuButton = document.getElementById('menu-button');

  checkbox?.addEventListener('click', () => {
    const newTheme = document.body.classList.contains(Theme.THEME_PLAY)
      ? Theme.THEME_TRAIN
      : Theme.THEME_PLAY;

    changeTheme(newTheme);
  });
  menuButton?.addEventListener('click', () => toggleBurgerMenu());
};

export const renderHeader = (): void => {
  const header = document.createElement('header');

  header.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand navbar-brand_pointer">English For Kids</a>
        <div class="form-check form-switch">
          <input class="form-check-input" role="button" type="checkbox" id="flexSwitchCheckDefault">
          <label class="form-check-label form-check-label_1-5rem ms-1" for="flexSwitchCheckDefault">Train</label>
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
  `;

  document.body.append(header);

  renderBurgerMenu();

  addHandlers();
};
