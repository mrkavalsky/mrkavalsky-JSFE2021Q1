import { cards } from '../../../public/cards';
import { renderMenuCard } from '../menu-card/menu-card';
import './main-page.css';

export const renderMainPage = (): void => {
  const main = document.createElement('main');

  main.className = 'main-page';

  cards.forEach((card) => {
    main.append(renderMenuCard(card));
  });

  document.body.append(main);
};
