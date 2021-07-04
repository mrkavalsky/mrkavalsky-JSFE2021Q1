import { CORRECT_AUDIO, ERROR_AUDIO } from '../config';

export function playCompareResult(compareResult: boolean): Promise<void> {
  return new Promise((res) => {
    const audio = new Audio();
    const audioSrc = compareResult ? CORRECT_AUDIO : ERROR_AUDIO;

    audio.addEventListener('ended', () => res());

    audio.src = audioSrc;
    audio.currentTime = 0;
    audio.play();
  });
}
