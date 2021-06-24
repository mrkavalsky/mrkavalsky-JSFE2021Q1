import { changeTheme } from '../redux/actions';
import { store } from '../redux/store';
import { THEME_PLAY, THEME_TRAIN } from '../redux/themes';

const changeBodyClass = (): void => {
  const { theme } = store.getState();

  document.body.className = theme.value;
};

export const initHeader = (): void => {
  const checkbox = document.getElementById('flexSwitchCheckDefault');

  checkbox?.addEventListener('click', () => {
    const newTheme = document.body.classList.contains(THEME_TRAIN)
      ? THEME_PLAY
      : THEME_TRAIN;

    store.dispatch(changeTheme(newTheme));
  });

  store.subscribe(changeBodyClass);
};
