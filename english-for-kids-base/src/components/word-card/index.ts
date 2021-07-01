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
      game: { isGameStarted },
    } = store.getState();

    if (value === Mode.TRAIN && target !== button) {
      playAudio(audioSrc);
    } else if (isGameStarted) {
    }
  });

  if (button) {
    button.addEventListener('click', () => {
      if (store.getState().mode.value === Mode.TRAIN) {
        cardContent?.classList.add('word-card_rotate');
      }
    });
  }

  card.addEventListener('mouseleave', () => {
    if (store.getState().mode.value === Mode.TRAIN) {
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
