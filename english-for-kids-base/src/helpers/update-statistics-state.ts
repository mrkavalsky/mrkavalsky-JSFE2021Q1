import { changeCurrentCard, updateCurrentCards } from '../actions/actions';
import { IGameWord } from '../types/interfaces';
import { findCard } from './find-card';
import { getUpdatedCards } from './getUpdatedCards';
import { playAudio } from './play-audio';

export const updateStatisticsState = (
  currentCards: IGameWord[],
  currentCard: IGameWord,
): void => {
  const newCurrentCards = getUpdatedCards(currentCards, currentCard);
  const newCurrentCard = findCard(newCurrentCards);

  if (newCurrentCard) {
    changeCurrentCard(newCurrentCard);
    playAudio(newCurrentCard.audioSrc);
  }
  updateCurrentCards(newCurrentCards);
};
