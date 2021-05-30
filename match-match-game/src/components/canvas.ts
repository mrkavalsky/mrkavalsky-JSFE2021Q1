export class Canvas {
  private canvas: HTMLCanvasElement = document.createElement('canvas');

  private context: CanvasRenderingContext2D | null = null;

  constructor() {
    this.context = this.canvas.getContext('2d');
  }

  getBase64File(img: HTMLImageElement): string | undefined {
    const imageRatio =
      img.width > img.height ? img.width / 40 : img.height / 40;
    this.canvas.width = img.width / imageRatio;
    this.canvas.height = img.height / imageRatio;
    if (!this.context) return undefined;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
    const dataURL = this.canvas.toDataURL('image/png');
    return dataURL.slice(dataURL.indexOf('base64,') + 7);
  }
}
