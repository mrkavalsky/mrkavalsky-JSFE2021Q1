import { createHTMLElement } from '../../helpers/create-html-element';
import { playAudio } from '../../helpers/play-audio';
import { changeHash } from '../../router/change-hash';
import { MAIN_PAGE } from '../main-page/config';
import { popupConfig } from './config';
import './styles.css';

const addHandler = (button: HTMLButtonElement): void => {
  button.addEventListener('click', () => {
    document.body.lastElementChild?.remove();

    changeHash(MAIN_PAGE);
  });
};

export const renderFinishGamePopup = (gameResult: string): void => {
  const { audio, image } = popupConfig[gameResult];
  const popup = createHTMLElement(`
    <div class="popup-wrapper">
      <div class="popup">
        <img class="popup__img" src="${image}" alt="${gameResult}">
        <h2>${gameResult}</h2>
        <button type="button"
                class="btn btn-primary"
                role="button">
          ok
        </button>
      </div>
      <div class="popup-overlay"></div>
    </div>
  `);
  const button = popup.querySelector('button');

  if (button) {
    addHandler(button);
  }

  document.body.append(popup);

  playAudio(audio);
};
