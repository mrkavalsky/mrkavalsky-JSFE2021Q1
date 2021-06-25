import { changeTheme, toggleMenu } from '../../redux/actions';
import {
  BURGER_MENU_HIDDEN,
  THEME_PLAY,
  THEME_TRAIN,
} from './classes';
import { store } from '../../redux/store';
import './header.css';

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
};

const changeBodyClass = (): void => {
  const { theme } = store.getState();

  document.body.className = theme.value;
};

const toggleBurgerMenu = (): void => {
  const { menu } = store.getState();
  const burgerMenu = document.getElementById('burger-menu');

  burgerMenu?.classList.toggle(BURGER_MENU_HIDDEN, menu.isHidden);
};

export const initHeader = (): void => {
  const checkbox = document.getElementById('flexSwitchCheckDefault');
  const menuButton = document.getElementById('menu-button');
  const burgerMenu = document.getElementById('burger-menu');

  checkbox?.addEventListener('click', () => {
    const newTheme = document.body.classList.contains(THEME_TRAIN)
      ? THEME_PLAY
      : THEME_TRAIN;

    store.dispatch(changeTheme(newTheme));
  });
  menuButton?.addEventListener('click', () => {
    const isHidden = !burgerMenu?.classList.contains(BURGER_MENU_HIDDEN);

    store.dispatch(toggleMenu(isHidden));
  });

  store.subscribe(changeBodyClass);
  store.subscribe(toggleBurgerMenu);
};
