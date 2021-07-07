import { changeGameMode, changeWordsList } from '../../actions/actions';
import { createHTMLElement } from '../../helpers/create-html-element';
import { getCurrentCards } from '../../helpers/get-current-cards';
import { playAudio } from '../../helpers/play-audio';
import { store } from '../../reducers/core/store';
import { renderWordCard } from '../word-card';
import './styles.css';
import { getHash } from '../../router/get-hash';
import { createPageStatistics } from '../../helpers/create-page-statistics';
import { ICardInfo } from '../../types/interfaces';

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

export const renderCategoryPage = (
  difficultCards: ICardInfo[] | null = null,
): Element => {
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
  const cardList = difficultCards || getCurrentCards(getHash());
  const pageStatistics = createPageStatistics(cardList);
  const button = main.querySelector('button');

  if (button) {
    addHandlers(button);
  }

  if (cardList) {
    if (cardList.length === 0) {
      button?.remove();
    }

    const fragment = document.createDocumentFragment();

    cardList.forEach((card) => {
      fragment.append(renderWordCard(card));
    });

    main.prepend(fragment);
  }

  if (pageStatistics) {
    changeWordsList(pageStatistics.currentCards, pageStatistics.currentCard);
  }

  return main;
};
