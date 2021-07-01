import { changeGameMode } from '../../actions/actions';
import { createHTMLElement } from '../../helpers/create-html-element';
import { findCard } from '../../helpers/find-card';
import { getGameWords } from '../../helpers/get-game-words';
import { getCurrentCards } from '../../helpers/get-current-cards';
import { playAudio } from '../../helpers/play-audio';
import { store } from '../../reducers/core/store';
import { renderWordCard } from '../word-card';
import './styles.css';
import { getHash } from '../../router/get-hash';

const addHandlers = (main: Element): void => {
  const button = main.querySelector('button');

  button?.addEventListener('click', () => {
    const {
      gameMode: { isGameStarted },
    } = store.getState();

    if (!isGameStarted) {
      changeGameMode(!isGameStarted);
    } else if (isGameStarted) {
    }
  });
};

export const changeStartGameButton = (isGameStarted: boolean): void => {
  const button = document.getElementById('start-game');

  if (button) {
    button.textContent = isGameStarted ? 'repeat' : 'start game';
    button.classList.toggle('btn-primary', !isGameStarted);
    button.classList.toggle('btn-secondary', isGameStarted);
  }
};

export const renderCategoryPage = (): void => {
  const main = createHTMLElement(`
    <main class="category-page">
      <button class="btn btn-primary category-page__button"
              type="button"
              id="start-game">
        start game
      </button>
    </main>
  `);
  const cardList = getCurrentCards(getHash());

  addHandlers(main);

  if (cardList) {
    const fragment = document.createDocumentFragment();

    cardList.forEach((card) => {
      fragment.append(renderWordCard(card));
    });

    main.prepend(fragment);
  }

  document.body.append(main);
};
