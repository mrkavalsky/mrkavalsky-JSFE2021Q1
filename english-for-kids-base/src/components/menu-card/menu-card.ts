import { ICards } from '../../interfaces';
import './menu-card.css';

export const renderMenuCard = ({ category, cards }: ICards): HTMLDivElement => {
  const card = document.createElement('div');

  card.className = 'menu-card';

  card.dataset.category = category;

  const [{ image }] = cards;
  card.innerHTML = `
    <div class="menu-card__img-wrapper">
      <img class="menu-card__img" src="${image}" alt="${category}">
    </div>
    <div class="menu-card__header">${category}</div>
  `;

  return card;
};
