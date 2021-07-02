import { compareWords } from '../../helpers/compare-words';
import { createHTMLElement } from '../../helpers/create-html-element';
import { playAudio } from '../../helpers/play-audio';
import { store } from '../../reducers/core/store';
import { ICardInfo } from '../../types/interfaces';
import { Mode } from '../../types/modes';
import './styles.css';

const addHandlers = (card: Element, audioSrc: string, word: string) => {
  const button = card.querySelector('button');
  const cardContent = card.firstElementChild;

  card.addEventListener('click', ({ target }) => {
    const {
      mode: { value },
      gameMode: { isGameStarted },
      statistics: { currentCard },
    } = store.getState();

    if (value === Mode.TRAIN && target !== button) {
      playAudio(audioSrc);
    }
    if (isGameStarted) {
      compareWords(currentCard.word, word);
    }
  });

  button?.addEventListener('click', () => {
    const { mode } = store.getState();

    if (mode.value === Mode.TRAIN) {
      cardContent?.classList.add('word-card_rotate');
    }
  });

  card.addEventListener('mouseleave', () => {
    const { mode } = store.getState();

    if (mode.value === Mode.TRAIN) {
      cardContent?.classList.remove('word-card_rotate');
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
