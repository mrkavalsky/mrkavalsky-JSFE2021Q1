import { cards } from '../../../public/cards';
import { createHTMLElement } from '../../helpers/create-html-element';
import { renderMenuCard } from '../menu-card';
import './styles.css';

export const renderMainPage = (): Element => {
  const main = createHTMLElement(`
    <main class="main-page" id="page"></main>
  `);

  cards.forEach((card) => {
    main.append(renderMenuCard(card));
  });

  return main;
};
