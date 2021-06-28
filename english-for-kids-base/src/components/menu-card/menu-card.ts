import { ICards } from '../../interfaces';
import './menu-card.css';
import { changeHash } from '../../redux/routing';

const addHandler = (card: HTMLDivElement): void => {
  card.addEventListener('click', () => {
    const { hash } = card.dataset;
    if (!hash) return;
    changeHash(hash);
  });
};

export const renderMenuCard = ({
  category,
  hash,
  cardsList: [{ image }],
}: ICards): HTMLDivElement => {
  const card = document.createElement('div');

  card.className = 'menu-card';

  card.dataset.hash = hash;

  card.innerHTML = `
    <div class="menu-card__img-wrapper">
      <img class="menu-card__img" src="${image}" alt="${category}">
    </div>
    <div class="menu-card__header">${category}</div>
  `;

  addHandler(card);

  return card;
};
