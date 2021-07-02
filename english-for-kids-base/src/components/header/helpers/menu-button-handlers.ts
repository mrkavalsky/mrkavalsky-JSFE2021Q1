import { toggleBurgerMenu } from '../burger-menu';
import { NAV_BTN_CLOSE } from '../classes';
import { MENU_BUTTON } from '../ids';

const changeMenuButtonBackground = (): void => {
  const menuButton = document.getElementById(MENU_BUTTON);

  menuButton?.classList.toggle(NAV_BTN_CLOSE);
};

export const runMenuButtonHandlers = (): void => {
  changeMenuButtonBackground();
  toggleBurgerMenu();
};
