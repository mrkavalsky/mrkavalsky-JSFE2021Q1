import { hitWord, missWord } from '../actions/actions';
import { CORRECT_AUDIO, ERROR_AUDIO } from '../components/word-card/config';
import { store } from '../reducers/core/store';
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

export async function compareWords(
  currentWord: string,
  playerWord: string,
): Promise<void> {
  const compareResult = currentWord === playerWord;

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
