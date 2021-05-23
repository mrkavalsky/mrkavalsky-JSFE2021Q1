import { BaseBlock } from '../../shared/base-block';
import './stopwatch.css';

export class Stopwatch extends BaseBlock {
  private interval: NodeJS.Timeout | null = null;

  private time = 0;

  constructor() {
    super('div', ['stopwatch']);
    this.element.innerText = '0:00';
  }

  start(): void {
    this.interval = setInterval(() => this.tick(), 1000);
  }

  tick(): void {
    this.time++;
    const minute = `${Math.floor(this.time / 60)}`;
    const second = `${this.time % 60}`;
    this.element.innerText = `${minute}:${
      second.length === 1 ? `0${second}` : second
    }`;
  }

  stop(): void {
    this.element.innerText = '0:00';
    this.time = 0;
    if (!this.interval) return;
    clearInterval(this.interval);
    this.interval = null;
  }
}
