import { changeCurrentCard, updateCurrentCards } from '../actions/actions';
import { IGameWord } from '../types/interfaces';
import { findCard } from './find-card';
import { finishGame } from './finish-game';
import { getUpdatedCards } from './get-updated-cards';
import { playAudio } from './play-audio';

export const updateStatisticsState = (
  currentCards: IGameWord[],
  currentCard: IGameWord,
): void => {
  const newCurrentCards = getUpdatedCards(currentCards, currentCard);
  const newCurrentCard = findCard(newCurrentCards);

  updateCurrentCards(newCurrentCards);

  if (newCurrentCard) {
    changeCurrentCard(newCurrentCard);
    playAudio(newCurrentCard.audioSrc);
  } else {
    finishGame();
  }
};
