import { BaseComponent } from "./components/base-component";

export class App {
  constructor(private readonly rootElement: HTMLElement, public rootChildren: BaseComponent[] = []) {}
  appendComponent(block: BaseComponent): void {
    this.rootElement.append(block.element);
    this.rootChildren.push(block);
  }
}
