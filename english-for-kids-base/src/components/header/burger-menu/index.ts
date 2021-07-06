import { cards } from '../../../../public/cards';
import { createHTMLElement } from '../../../helpers/create-html-element';
import './styles.css';
import { BURGER_MENU_HIDDEN } from './classes';
import { changeHash } from '../../../router/change-hash';
import { changeGameMode } from '../../../actions/actions';
import { NAV_BTN_CLOSE } from '../classes';
import { store } from '../../../reducers/core/store';
import { updateLocalStorage } from '../../../local-storage';
import { STATISTICS_PAGE } from '../../statistics-page/config';

const addListItemHandler = (listItem: Element, hash: string) => {
  listItem.addEventListener('click', () => {
    const {
      gameMode: { isGameStarted },
      statistics: { currentCards },
    } = store.getState();

    updateLocalStorage(currentCards);
    changeHash(hash);

    if (isGameStarted) {
      changeGameMode(!isGameStarted);
    }
  });
};

const addMenuHandler = (menu: Element) => {
  const background = document.getElementById('burger-menu-wrapper__background');
  const menuButton = document.getElementById('menu-button');

  background?.addEventListener('click', () => {
    menu.classList.add(BURGER_MENU_HIDDEN);
    menuButton?.classList.remove(NAV_BTN_CLOSE);
  });
};

const createBurgerMenuList = (): Element => {
  const burgerMenuList = createHTMLElement(`
    <ul class="list-unstyled"></ul>
  `);

  [...cards, STATISTICS_PAGE].forEach(({ category, hash }) => {
    const listItem = createHTMLElement(`
      <li class="h3 py-1" role="button">${category}</li>
    `);

    addListItemHandler(listItem, hash);

    burgerMenuList.append(listItem);
  });

  return burgerMenuList;
};

export const renderBurgerMenu = (): void => {
  const burgerMenu = createHTMLElement(`
    <div class="burger-menu-wrapper burger-menu-wrapper_hidden"
        id="burger-menu">
      <nav class="burger-menu bg-dark"></nav>
      <div class="burger-menu-wrapper__background"
          id="burger-menu-wrapper__background"></div>
    </div>
  `);

  burgerMenu.firstElementChild?.append(createBurgerMenuList());

  document.body.append(burgerMenu);

  addMenuHandler(burgerMenu);
};

export const toggleBurgerMenu = (): void => {
  const burgerMenu = document.getElementById('burger-menu');

  burgerMenu?.classList.toggle(BURGER_MENU_HIDDEN);
};
