import { cards } from '../../../public/cards';
import './burger-menu.css';

const createBurgerMenuList = (): HTMLUListElement => {
  const burgerMenuList = document.createElement('ul');

  burgerMenuList.className = 'list-unstyled';

  Object.keys(cards).forEach((category) => {
    const listItem = document.createElement('li');

    listItem.setAttribute('role', 'button');
    listItem.className = 'h3 py-1';
    listItem.textContent = category;

    burgerMenuList.append(listItem);
  });

  return burgerMenuList;
};

export const renderBurgerMenu = (): void => {
  const burgerMenu = document.createElement('nav');

  burgerMenu.className =
    'burger-menu burger-menu_hidden position-fixed top-0 start-0 bg-dark d-flex justify-content-center pt-5';

  burgerMenu.append(createBurgerMenuList());

  document.body.append(burgerMenu);
};
