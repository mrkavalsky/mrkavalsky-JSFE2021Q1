import { changeGameMode } from '../actions/actions';
import { renderFinishGamePopup } from '../components/finish-game-popup';
import { FAILURE, SUCCESS } from '../components/finish-game-popup/config';
import { store } from '../reducers/core/store';
import { IGameWord } from '../types/interfaces';

const getGameResult = (currentCards: IGameWord[]): string =>
  currentCards.find(({ miss }) => miss > 0) ? FAILURE : SUCCESS;

export const finishGame = (): void => {
  const {
    gameMode: { isGameStarted },
    statistics: { currentCards },
  } = store.getState();
  const gameResult = getGameResult(currentCards);

  changeGameMode(!isGameStarted);
  renderFinishGamePopup(gameResult);
};
