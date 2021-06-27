import { cards } from '../../../public/cards';
import { renderWordCard } from '../word-card/word-card';
import './category-page.css';

export const renderCategoryPage = (currentCategory: string): void => {
  const main = document.createElement('main');

  main.className = 'category-page';

  const currentCards = cards.find(
    ({ category }) => category === currentCategory,
  );
  if (!currentCards) return;
  currentCards.cardsList.forEach((card) => {
    main.append(renderWordCard(card));
  });

  document.body.append(main);
};
