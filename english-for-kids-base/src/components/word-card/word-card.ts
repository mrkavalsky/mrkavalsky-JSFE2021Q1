import { createHTMLElement } from '../../helpers/create-html-element';
import { playAudio } from '../../helpers/play-audio';
import { store } from '../../reducers/core/store';
import { ICardInfo } from '../../types/interfaces';
import { Mode } from '../../types/modes';
import './word-card.css';

const addHandlers = (card: Element, audioSrc: string) => {
  const button = card.querySelector('button');
  const cardContent = card.firstElementChild;

  card.addEventListener('click', ({ target }) => {
    if (store.getState().mode.value === Mode.TRAIN && target !== button) {
      playAudio(audioSrc);
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

  addHandlers(card, audioSrc);

  return card;
};
