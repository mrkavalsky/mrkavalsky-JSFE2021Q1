import { BaseComponent } from '../../shared/base-component';
import './car.css';

export class Car extends BaseComponent {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'car');
  }
}
