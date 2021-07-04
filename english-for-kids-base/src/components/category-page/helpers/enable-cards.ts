import { WORD_CARD_DISABLE } from '../../word-card/classes';

export const enableCards = (): void => {
  const page = document.getElementById('category-page');

  if (page) {
    [...page.children].forEach((e) => e.classList.remove(WORD_CARD_DISABLE));
  }
};
