import { cards } from '../../../../public/cards';
import { createHTMLElement } from '../../../helpers/create-html-element';
import './burger-menu.css';
import { BURGER_MENU_HIDDEN } from './classes';

const createBurgerMenuList = (): Element => {
  const burgerMenuList = createHTMLElement(`
    <ul class="list-unstyled"></ul>
  `);

  cards.forEach(({ category }) => {
    const listItem = createHTMLElement(`
      <li class="h3 py-1" role="button">${category}</li>
    `);

    burgerMenuList.append(listItem);
  });

  return burgerMenuList;
};

export const renderBurgerMenu = (): void => {
  const burgerMenu = createHTMLElement(`
    <nav class="burger-menu burger-menu_hidden position-fixed top-0 bg-dark d-flex justify-content-center pt-5"
         id="burger-menu">
    </nav>
  `);

  burgerMenu.append(createBurgerMenuList());

  document.body.append(burgerMenu);
};

export const toggleBurgerMenu = (): void => {
  const burgerMenu = document.getElementById('burger-menu');

  burgerMenu?.classList.toggle(BURGER_MENU_HIDDEN);
};
