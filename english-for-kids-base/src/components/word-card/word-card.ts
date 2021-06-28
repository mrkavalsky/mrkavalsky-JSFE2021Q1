import { createHTMLElement } from '../../helpers/create-html-element';
import { ICardInfo } from '../../types/interfaces';
import './word-card.css';

export const renderWordCard = ({
  word,
  translation,
  image,
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

  return card;
};
