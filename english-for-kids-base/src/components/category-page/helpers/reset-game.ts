import { enableCards } from './enable-cards';
import { removeStars } from './remove-stars';

export const resetGame = (): void => {
  enableCards();
  removeStars();
};
