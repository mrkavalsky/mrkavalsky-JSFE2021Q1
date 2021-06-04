import './app.css';
import { Header } from './components/header';

export class App {
  constructor(private rootElement: HTMLElement) {
    const header: Header = new Header(rootElement);
    rootElement.append(header.node);
  }
}
