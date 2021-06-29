import { createHTMLElement } from '../../helpers/create-html-element';
import { getCurrentCards } from '../../helpers/get-current-cards';
import { renderWordCard } from '../word-card/word-card';
import './category-page.css';

export const renderCategoryPage = (hash: string): void => {
  const main = createHTMLElement(`
    <main class="category-page"></main>
  `);

  const cardList = getCurrentCards(hash);

  if (!cardList) return;

  cardList.forEach((card) => {
    main.append(renderWordCard(card));
  });

  main.append(
    createHTMLElement(`
    <button class="btn btn-primary category-page__button"
            type="button"
            id="start-game">
      start game
    </button>
  `),
  );

  document.body.append(main);
};
