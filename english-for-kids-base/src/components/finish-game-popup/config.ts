import { IPopupConfig } from '../../types/interfaces';

export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

export const popupConfig: IPopupConfig = {
  [SUCCESS]: {
    audio: 'audio/success.mp3',
    image: 'img/success.png',
  },
  [FAILURE]: {
    audio: 'audio/failure.mp3',
    image: 'img/failure.png',
  },
};
