import { ICardInfo } from '../../interfaces';
import './word-card.css';

export const renderWordCard = ({
  word,
  translation,
  image,
}: ICardInfo): HTMLDivElement => {
  const card = document.createElement('div');

  card.className = 'word-card-container';

  card.dataset.word = word;

  card.innerHTML = `
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
  `;

  return card;
};
