import { CORRECT_STAR_IMAGE, ERROR_STAR_IMAGE } from '../config';
import { createHTMLElement } from '../../../helpers/create-html-element';

export const addStar = (compareResult: boolean): void => {
  const imgSrc = compareResult ? CORRECT_STAR_IMAGE : ERROR_STAR_IMAGE;
  const star = createHTMLElement(`
    <img class="star" src="${imgSrc}" alt="star">
  `);
  const score = document.getElementById('score');

  score?.prepend(star);
};
