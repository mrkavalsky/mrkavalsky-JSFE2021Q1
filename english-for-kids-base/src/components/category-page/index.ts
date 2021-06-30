import { START_GAME } from '../../actions/action-types';
import { startGame } from '../../actions/actions';
import { createHTMLElement } from '../../helpers/create-html-element';
import { findCard } from '../../helpers/find-card';
import { getGameCards } from '../../helpers/get-cards';
import { getCurrentCards } from '../../helpers/get-current-cards';
import { playAudio } from '../../helpers/play-audio';
import { store } from '../../reducers/core/store';
import { renderWordCard } from '../word-card';
import './styles.css';

const addHandlers = (main: Element): void => {
  const button = main.querySelector('button');

  button?.addEventListener('click', () => {
    const {
      game: { value, currentCard },
    } = store.getState();

    if (value !== START_GAME) {
      const cards = getGameCards();
      const card = findCard(cards);

      startGame(cards, card);
    } else if (value === START_GAME) {
      playAudio(currentCard.audioSrc);
    }
  });
};

export const changeStartGameButton = (): void => {
  const button = document.getElementById('start-game');

  if (button) {
    button.textContent = 'repeat';
    button.classList.remove('btn-primary');
    button.classList.add('btn-secondary');
  }
};

export const renderCategoryPage = (hash: string): void => {
  const main = createHTMLElement(`
    <main class="category-page">
      <button class="btn btn-primary category-page__button"
              type="button"
              id="start-game">
        start game
      </button>
    </main>
  `);
  const cardList = getCurrentCards(hash);

  if (cardList) {
    const fragment = document.createDocumentFragment();

    cardList.forEach((card) => {
      fragment.append(renderWordCard(card));
    });

    main.prepend(fragment);
  }

  addHandlers(main);

  document.body.append(main);
};
