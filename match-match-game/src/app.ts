import { BaseBlock } from "./components/base-block";
import { BaseComponent } from "./components/base-component";
import { AboutGamePage } from "./pages/about-game-page/about-game-page";
import './index.css';

export class App {
  constructor(private readonly rootElement: HTMLElement, public rootChildren: BaseComponent[] = []) {
    this.appendComponent(new BaseBlock('header', ['header']));
    this.appendComponent(new AboutGamePage());
  }
  appendComponent(block: BaseComponent): void {
    this.rootElement.append(block.element);
    this.rootChildren.push(block);
  }
}
