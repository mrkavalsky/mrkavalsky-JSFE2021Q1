import 'bootstrap/dist/css/bootstrap.min.css';
import { renderApp } from './components/renderApp';
import './styles.css';
import { store } from './redux/store';
import { addRouting } from './redux/routing';
import { changeBodyClass, toggleBurgerMenu } from './components/header/header';
import { changeCurrentPage } from './redux/change-current-page';

const initApp = (): void => {
  renderApp();

  addRouting();

  let prevState = store.getState();

  store.subscribe(() => {
    const { theme, menu, page } = store.getState();

    if (theme.value !== prevState.theme.value) {
      changeBodyClass();
    } else if (menu.isHidden !== prevState.menu.isHidden) {
      toggleBurgerMenu();
    } else if (page.value !== prevState.page.value) {
      changeCurrentPage();
    }

    prevState = store.getState();
  });
};

window.addEventListener('load', initApp);
