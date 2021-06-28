import { cards } from '../../../public/cards';
import { createHTMLElement } from '../../helpers/create-html-element';
import { renderMenuCard } from '../menu-card/menu-card';
import './main-page.css';

export const renderMainPage = (): void => {
  const main = createHTMLElement(`
    <main class="main-page"></main>
  `);

  cards.forEach((card) => {
    main.append(renderMenuCard(card));
  });

  document.body.append(main);
};
