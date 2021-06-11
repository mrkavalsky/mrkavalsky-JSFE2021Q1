import { BaseComponent } from '../../shared/base-component';
import './car.css';

export class Car extends BaseComponent {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'car');
  }

  setColor(color: string): void {
    this.node.style.backgroundColor = color;
  }

  moveCar(): void {
    this.node.style.left = 'calc(100% - 120px)';
  }

  returnBackCar(): void {
    this.node.style.left = '0';
  }

  stopCar(): void {
    this.node.style.left = `${this.node.getBoundingClientRect().left}px`;
  }

  setTransitionTime(time: string): void {
    this.node.style.transitionDuration = time;
  }
}
