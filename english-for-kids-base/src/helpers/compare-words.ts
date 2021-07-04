import { hitWord, missWord } from '../actions/actions';
import {
  CORRECT_STAR_IMAGE,
  ERROR_STAR_IMAGE,
} from '../components/category-page/config';
import { CORRECT_AUDIO, ERROR_AUDIO } from '../components/word-card/config';
import { store } from '../reducers/core/store';
import { createHTMLElement } from './create-html-element';
import { updateStatisticsState } from './update-statistics-state';

function playCompareResult(compareResult: boolean): Promise<void> {
  return new Promise((res) => {
    const audio = new Audio();
    const audioSrc = compareResult ? CORRECT_AUDIO : ERROR_AUDIO;

    audio.addEventListener('ended', () => res());

    audio.src = audioSrc;
    audio.currentTime = 0;
    audio.play();
  });
}

const addStar = (compareResult: boolean) => {
  const imgSrc = compareResult ? CORRECT_STAR_IMAGE : ERROR_STAR_IMAGE;
  const star = createHTMLElement(`
    <img class="star" src="${imgSrc}" alt="star">
  `);
  const score = document.getElementById('score');

  score?.prepend(star);
};

export async function compareWords(
  currentWord: string,
  playerWord: string,
): Promise<void> {
  const compareResult = currentWord === playerWord;

  addStar(compareResult);
  await playCompareResult(compareResult);

  if (compareResult) {
    hitWord();

    const {
      statistics: { currentCard, currentCards },
    } = store.getState();

    updateStatisticsState(currentCards, currentCard);
  } else {
    missWord();
  }
}
