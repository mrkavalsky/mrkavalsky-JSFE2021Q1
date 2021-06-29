import { ActionTypes } from '../../actions/action-types';
import { startGame } from '../../actions/actions';
import { createHTMLElement } from '../../helpers/create-html-element';
import { getCurrentCards } from '../../helpers/get-current-cards';
import { store } from '../../reducers/core/store';
import { renderWordCard } from '../word-card/word-card';
import './category-page.css';

const addHandlers = (button: Element): void => {
  button.addEventListener('click', () => {
    const {
      game: { value },
    } = store.getState();

    if (value !== ActionTypes.START_GAME) {
      startGame();
    }
  });
};

export const changeStartGameButton = (): void => {
  const button = document.getElementById('start-game');

  if (!button) return;

  button.textContent = 'repeat';
  button.classList.remove('btn-primary');
  button.classList.add('btn-secondary');
};

export const renderCategoryPage = (hash: string): void => {
  const main = createHTMLElement(`
    <main class="category-page"></main>
  `);
  const cardList = getCurrentCards(hash);
  const button = createHTMLElement(`
    <button class="btn btn-primary category-page__button"
            type="button"
            id="start-game">
      start game
    </button>
  `);

  if (!cardList) return;

  cardList.forEach((card) => {
    main.append(renderWordCard(card));
  });
  main.append(button);

  addHandlers(button);

  document.body.append(main);
};
