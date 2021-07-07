import { changeGameMode, changeWordsList } from '../../actions/actions';
import { createHTMLElement } from '../../helpers/create-html-element';
import { getCurrentCards } from '../../helpers/get-current-cards';
import { playAudio } from '../../helpers/play-audio';
import { store } from '../../reducers/core/store';
import { renderWordCard } from '../word-card';
import './styles.css';
import { getHash } from '../../router/get-hash';
import { createPageStatistics } from '../../helpers/create-page-statistics';

const addHandlers = (button: Element): void => {
  button.addEventListener('click', () => {
    const {
      gameMode: { isGameStarted },
      statistics: {
        currentCard: { audioSrc },
      },
    } = store.getState();

    if (!isGameStarted) {
      changeGameMode(!isGameStarted);
    }

    playAudio(audioSrc);
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
    <main class="category-page" id="category-page">
      <div class="category-page__score" id="score"></div>
      <button class="btn btn-primary category-page__button"
              type="button"
              id="start-game">
        start game
      </button>
    </main>
  `);
  const cardList = getCurrentCards(getHash());
  const pageStatistics = createPageStatistics();
  const button = main.querySelector('button');
  const header = document.getElementById('header');

  if (button) {
    addHandlers(button);
  }

  if (cardList) {
    const fragment = document.createDocumentFragment();

    cardList.forEach((card) => {
      fragment.append(renderWordCard(card));
    });

    main.prepend(fragment);
  }

  if (pageStatistics) {
    changeWordsList(pageStatistics.currentCards, pageStatistics.currentCard);
  }

  header?.after(main);
};
