import { getCurrentCards } from '../../helpers/get-current-cards';
import { renderWordCard } from '../word-card/word-card';
import './category-page.css';

export const renderCategoryPage = (hash: string): void => {
  const main = document.createElement('main');

  main.className = 'category-page';

  const cardList = getCurrentCards(hash);

  if (!cardList) return;

  cardList.forEach((card) => {
    main.append(renderWordCard(card));
  });

  document.body.append(main);
};
