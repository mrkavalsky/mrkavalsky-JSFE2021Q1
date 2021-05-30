import { BaseBlock } from '../../shared/base-block';
import { BaseComponent } from '../../shared/base-component';
import './file-input.css';

export class FileInput extends BaseBlock {
  private input: BaseComponent = new BaseComponent('input', [
    'file-input__input',
  ]);

  private imageSrc = '';

  private reader: FileReader = new FileReader();

  constructor() {
    super('label', ['file-input']);
    this.input.element.setAttribute('type', 'file');
    this.input.element.setAttribute('accept', 'image/*');
    this.input.element.addEventListener('change', () => {
      this.uploadFile();
    });
    this.appendComponents([this.input]);
    this.reader.onload = () => {
      if (typeof this.reader.result === 'string') {
        this.imageSrc = this.reader.result;
      }
    };
  }

  uploadFile(): void {
    const inputElement: HTMLInputElement = this.input
      .element as HTMLInputElement;
    const fileList: FileList | null = inputElement.files;
    if (!fileList) return;
    this.reader.readAsDataURL(fileList[0]);
  }

  getImage(): Promise<HTMLImageElement> {
    return new Promise((resolve) => {
      const image: HTMLImageElement = new Image();
      image.src = this.imageSrc;
      image.addEventListener(
        'load',
        () => {
          resolve(image);
        },
        { once: true },
      );
    });
  }
}
