import { cards } from '../../../../public/cards';
import { createHTMLElement } from '../../../helpers/create-html-element';
import './styles.css';
import { BURGER_MENU_HIDDEN } from './classes';
import { changeHash } from '../../../router/change-hash';

const addHandler = (listItem: Element, hash: string) => {
  listItem.addEventListener('click', () => changeHash(hash));
};

const createBurgerMenuList = (): Element => {
  const burgerMenuList = createHTMLElement(`
    <ul class="list-unstyled"></ul>
  `);

  cards.forEach(({ category, hash }) => {
    const listItem = createHTMLElement(`
      <li class="h3 py-1" role="button">${category}</li>
    `);

    addHandler(listItem, hash);

    burgerMenuList.append(listItem);
  });

  return burgerMenuList;
};

export const renderBurgerMenu = (): void => {
  const burgerMenu = createHTMLElement(`
    <nav class="burger-menu burger-menu_hidden bg-dark"
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
