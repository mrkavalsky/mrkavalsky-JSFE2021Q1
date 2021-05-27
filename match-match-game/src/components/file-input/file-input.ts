import { BaseBlock } from '../../shared/base-block';
import { BaseComponent } from '../../shared/base-component';
import './file-input.css';

export class FileInput extends BaseBlock {
  private input: BaseComponent = new BaseComponent('input', [
    'file-input__input',
  ]);

  private imageSrc: string | ArrayBuffer | null = null;

  constructor() {
    super('label', ['file-input']);
    this.input.element.setAttribute('type', 'file');
    this.input.element.setAttribute('accept', 'image/*');
    this.input.element.addEventListener('change', () => {
      this.uploadFile();
    });
    this.appendComponents([this.input]);
  }

  uploadFile(): void {
    const inputElement: HTMLInputElement = this.input
      .element as HTMLInputElement;
    const fileList: FileList | null = inputElement.files;
    if (!fileList) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.imageSrc = reader.result;
    };
    reader.readAsDataURL(fileList[0]);
  }
}
