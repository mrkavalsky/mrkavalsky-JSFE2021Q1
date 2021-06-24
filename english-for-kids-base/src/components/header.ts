import { changeTheme, toggleMenu } from '../redux/actions';
import { store } from '../redux/store';
import { BURGER_MENU_HIDDEN, THEME_PLAY, THEME_TRAIN } from '../redux/classes';

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
