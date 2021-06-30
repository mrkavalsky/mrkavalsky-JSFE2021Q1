import { ActionTypes } from '../../actions/action-types';
import { startGame } from '../../actions/actions';
import { createHTMLElement } from '../../helpers/create-html-element';
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

    if (value !== ActionTypes.START_GAME) {
      startGame();
    } else if (value === ActionTypes.START_GAME) {
      playAudio(currentCard.audioSrc);
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
    <main class="category-page">
      <button class="btn btn-primary category-page__button"
              type="button"
              id="start-game">
        start game
      </button>
    </main>
  `);
  const cardList = getCurrentCards(hash);

  if (!cardList) return;

  cardList.forEach((card) => {
    main.append(renderWordCard(card));
  });

  addHandlers(main);

  document.body.append(main);
};
