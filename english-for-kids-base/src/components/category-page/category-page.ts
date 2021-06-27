import { getCurrentCards } from '../../get-current-cards';
import { renderWordCard } from '../word-card/word-card';
import './category-page.css';

export const renderCategoryPage = (currentCategory: string): void => {
  const main = document.createElement('main');

  main.className = 'category-page';

  const cardList = getCurrentCards(currentCategory);

  if (!cardList) return;

  cardList.forEach((card) => {
    main.append(renderWordCard(card));
  });

  document.body.append(main);
};
