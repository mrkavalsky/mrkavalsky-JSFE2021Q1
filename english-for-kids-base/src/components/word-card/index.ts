import { compareWords } from './helpers/compare-words';
import { createHTMLElement } from '../../helpers/create-html-element';
import { playAudio } from '../../helpers/play-audio';
import { store } from '../../reducers/core/store';
import { ICardInfo, ICustomTarget } from '../../types/interfaces';
import { Mode } from '../../types/modes';
import { addStar } from '../category-page/helpers/add-star';
import { playCompareResult } from './helpers/play-compare-result';
import './styles.css';
import { updateStatisticsState } from '../../helpers/update-statistics-state';
import { updateCurrentCard } from '../../helpers/update-current-card';
import { WORD_CARD_ROTATE } from './classes';

const addHandlers = (card: Element, audioSrc: string, word: string) => {
  const cardContent = card.firstElementChild;

  card.addEventListener('click', async ({ target }) => {
    const {
      mode: { value },
      gameMode: { isGameStarted },
      statistics: { currentCard },
    } = store.getState();
    const { nodeName } = target as ICustomTarget;

    if (value === Mode.TRAIN) {
      if (nodeName === 'BUTTON') {
        cardContent?.classList.add(WORD_CARD_ROTATE);
      } else {
        playAudio(audioSrc);
      }
    }
    if (isGameStarted) {
      const compareResult = compareWords(currentCard.word, word);

      addStar(compareResult);
      await playCompareResult(compareResult);
      updateCurrentCard(compareResult);

      if (compareResult) {
        updateStatisticsState();
      }
    }
  });

  card.addEventListener('mouseleave', () => {
    const { mode } = store.getState();

    if (mode.value === Mode.TRAIN) {
      cardContent?.classList.remove(WORD_CARD_ROTATE);
    }
  });
};

export const renderWordCard = ({
  word,
  translation,
  image,
  audioSrc,
}: ICardInfo): Element => {
  const card = createHTMLElement(`
    <div class="word-card-container">
      <div class="word-card">
        <div class="word-card__side">
          <img class="word-card__img" src="${image}" alt="${word}">
          <div class="word-card__header">
            ${word}
            <button type="button" class="btn btn-secondary btn_rotate"></button>
          </div>
        </div>
        <div class="word-card__side word-card__side_back">
          <img class="word-card__img" src="${image}" alt="${translation}">
          <div class="word-card__header">${translation}</div>
        </div>
      </div>
    </div>
  `);

  addHandlers(card, audioSrc, word);

  return card;
};
