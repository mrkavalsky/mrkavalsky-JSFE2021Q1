import { ICards } from '../../interfaces';
import { renderWordCard } from '../word-card/word-card';
import './main-page.css';

export const renderCategoryPage = ({ cards }: ICards): void => {
  const main = document.createElement('main');

  main.className = 'category-page';

  cards.forEach((card) => {
    main.append(renderWordCard(card));
  });

  document.body.append(main);
};
