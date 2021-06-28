import { ICards } from '../../types/interfaces';
import { changeHash } from '../../router/change-hash';
import './menu-card.css';
import { createHTMLElement } from '../../helpers/create-html-element';

const addHandler = (card: Element, hash: string): void => {
  card.addEventListener('click', () => changeHash(hash));
};

export const renderMenuCard = ({
  category,
  hash,
  cardsList: [{ image }],
}: ICards): Element => {
  const card = createHTMLElement(`
    <div class="menu-card">
      <div class="menu-card__img-wrapper">
        <img class="menu-card__img" src="${image}" alt="${category}">
      </div>
      <div class="menu-card__header">${category}</div>
    </div>
  `);

  addHandler(card, hash);

  return card;
};
