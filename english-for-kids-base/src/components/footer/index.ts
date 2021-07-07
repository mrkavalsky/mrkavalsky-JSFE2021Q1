import { createHTMLElement } from '../../helpers/create-html-element';
import './styles.css';

export const renderFooter = (): void => {
  const footer = createHTMLElement(`
    <footer class="footer">
      <a href="https://github.com/mrkavalsky">Github</a>
      <span>2021</span>
      <a class="link" href="https://rs.school/js/"></a>
    </footer>
  `);

  document.body.append(footer);
};
