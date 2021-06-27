import { ICards } from '../../interfaces';
import { changePage } from '../../actions/actions';
import './menu-card.css';

const addHandler = (card: HTMLDivElement): void => {
  card.addEventListener('click', () => {
    const { category } = card.dataset;
    if (!category) return;
    changePage(category);
  });
};

export const renderMenuCard = ({
  category,
  cardsList: [{ image }],
}: ICards): HTMLDivElement => {
  const card = document.createElement('div');

  card.className = 'menu-card';

  card.dataset.category = category;

  card.innerHTML = `
    <div class="menu-card__img-wrapper">
      <img class="menu-card__img" src="${image}" alt="${category}">
    </div>
    <div class="menu-card__header">${category}</div>
  `;

  addHandler(card);

  return card;
};
